
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SubButton } from '../components/atoms/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { CameraGalleryDialog } from '../components/molecules/PopupDialog';
import { useEffect, useState } from 'react';
import { CustomText } from '../components/atoms/Text';
import { clearImgsArr } from '../store/reducers/imgs';
import {Image} from 'expo-image'
import {MediaLibrary} from 'expo'
import { runningModel } from '../util/post';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { setImgs } from '../store/reducers/imgs';
import { ModelLoadingOverlay } from '../components/organisms/LoadingOverlay';

export const ImageUploadScreen = ({navigation}) => {
  const imgsArr = useSelector((state) => state.imgs.imgsArr)
  const token = useSelector((state) => state.auth.token)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const [loading, setLoading] = useState(false)
  const [isBeforeModel, setIsBeforeModel] = useState(true)
  const imgObjectsArr = useSelector((state) => state.imgs.imgObjectsArr)
  console.log(imgsArr)
  useEffect(() => {
  }, [])

  return (
    <View style={styles.container}>
    {loading && <ModelLoadingOverlay/>}
      <View style={styles.header}>
        <Pressable 
          onPress={()=> {
            navigation.navigate(prevRoute)
            dispatch(clearImgsArr())
          }}
          style={{width:35, height:35}}>
        <Image 
          style={{width:'100%', height:'100%', opacity: 0.5}} source={require('../../assets/reject.png')}/>
        </Pressable>
        <Pressable 
          onPress={ async () => {
            if (isBeforeModel) {
              setLoading(true)
              const afterModelImg = await runningModel({
                imgList: imgObjectsArr, 
                token: token
              })
              console.log(afterModelImg)
              dispatch(setImgs({
                'imgsUrlArr': afterModelImg,
              }))
              setLoading(false)
              setIsBeforeModel(false)
            } else {
              navigation.navigate('post-write')
            }
            }}>
          <Text style={{fontSize:22, color:'#206CFF', fontFamily: 'nexon-gothic-medium'}}>다음</Text>
        </Pressable>      
      </View>
      <View style={{ width: wp('100%'), height: hp('30%'), top: 30 }}>
        <Pressable>
          <SliderBox
            autoplay={false}  //자동 슬라이드 넘김
            circleLoop={false} //맨끝 슬라이드에서 다시 첫슬라이드로
            resizeMode="cover"  // 이미지 사이즈 조절값
            images={imgsArr} // 이미지 주소 리스트 
            dotColor="#000000" 
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: wp('85%'), height: hp('30%') }} // 이미지 Style 적용
            currentImageEmitter={(index) => { // 이미지가 바뀔때 어떤 동작을 할지 설정 
              console.log(index)
              // this.setState({
              //   currentIndex: index + 1,
              // });
            }}
          />
        </Pressable>
        <View style={{display:'flex', flexDirection:'row', justifyContent: 'center', marginHorizontal: 40, marginVertical: 15}}>
          {/* <SubButton 
            style={{margin: 17, flex: 1}}
            onPress={() => {
              MediaLibrary
            }}>
              저장
          </SubButton> */}
          {isBeforeModel&&<SubButton 
            style={{margin: 17, flex: 1}}
            onPress={()=>{
              if (imgsArr.length >= 5) {
                alert('사진 업로드는 5장까지 가능합니다')
              } else {
                setVisible(true)
              }
            }}
            >추가</SubButton>}
        </View>
      </View>
      <CameraGalleryDialog visible={visible} setVisible={setVisible}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  subContainer: {
    padding:20
  },
  imgContainer: {
    width : wp('100%'),  // 스크린 가로 크기 100%
    height : hp('50%'), // 스크린 세로 크기 50%
    top : hp('30%'), // 스크린 세로 크기의 30% 만큼 0에서부터 이동 
  },
  header: {
    width: wp('100%'),
    paddingTop: 55,
    paddingLeft: 10,
    paddingRight: 20,
    // paddingBottom: 10,
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
