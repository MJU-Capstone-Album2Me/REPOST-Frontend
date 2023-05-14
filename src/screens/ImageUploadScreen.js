
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SubButton } from '../components/atoms/Buttons';

export const ImageUploadScreen = () => {
  
  return (
    <View style={styles.container}>
      <View style={{ width: wp('100%'), height: hp('30%'), top: 30 }}>
        <SliderBox
          autoplay={false}  //자동 슬라이드 넘김
          circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
          resizeMode="cover"  // 이미지 사이즈 조절값
          images={['https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?cs=srgb&dl=pexels-lukas-296282.jpg&fm=jpg','https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?cs=srgb&dl=pexels-daniel-reche-1556691.jpg&fm=jpg']} // 이미지 주소 리스트 
          dotColor="#000000" 
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: wp('90%'), height: hp('30%') }} // 이미지 Style 적용
          currentImageEmitter={(index) => { // 이미지가 바뀔때 어떤 동작을 할지 설정 
            // this.setState({
            //   currentIndex: index + 1,
            // });
          }}
        />
        <View style={{display:'flex', flexDirection:'row', justifyContent: 'center', marginHorizontal: 40, marginVertical: 20}}>
          <SubButton>저장</SubButton>
          <SubButton>추가</SubButton>
        </View>
      </View>
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
  }
});
