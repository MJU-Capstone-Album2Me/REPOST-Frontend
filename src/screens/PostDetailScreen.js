import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView } from 'react-native';
import { CustomText } from '../components/atoms/Text';
import { Header } from '../components/atoms/Header'
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Shadow} from 'react-native-shadow-2'
import { Comment } from '../components/molecules/Comment';
import { useState } from 'react';

export const PostDetailScreen = ({navigation}) => {
  const [titleMsg, setTitleMsg] = useState('2004.09.10 서울랜드 갔던 날')
  const [author, setAuthor] = useState('홍길동')
  const [imgLlist, setImgList] = useState(['https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?cs=srgb&dl=pexels-lukas-296282.jpg&fm=jpg','https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?cs=srgb&dl=pexels-daniel-reche-1556691.jpg&fm=jpg'])
  const [mainContent, setMainContent] = useState('새침한 표정의 정석이다. 이때 사진을 찍는데 앞에 예쁜 누나가 지나갔다.')
  const [commentList, setCommentList] = useState([
    {icon: 'url', text: '민정아 진짜 개이쁘다'},
    {icon: 'url', text: '이거 모야 완전 요신'},
    {icon: 'url', text: '안노앙나ㅗㄹㄴㅇ'},
  ])

  // route 
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  
  return (
    <View style={styles.container}>
      <Shadow containerStyle={{width: wp('100%')}} distance={2}>
      <View style={styles.header}>
        <View 
          onTouchStart={()=> navigation.navigate(prevRoute)}
          style={{width:35, height:35}}>
        <Image 
          style={{width:'100%', height:'100%'}} source={require('../../assets/back.png')}/>
        </View>
      </View>
      </Shadow>
      <ScrollView>
      <View style={styles.title}>
        <View style={styles.icon}></View>
        <View style={styles.inTitle}>
          <Text style={{fontSize:17, fontFamily: 'nexon-gothic-medium'}}>{titleMsg}</Text>
          <CustomText style={{fontSize:12}}>{author}</CustomText>
        </View>
      </View>
      <SliderBox
          autoplay={false}  //자동 슬라이드 넘김
          circleLoop={false} //맨끝 슬라이드에서 다시 첫슬라이드로
          resizeMode="cover"  // 이미지 사이즈 조절값
          images={imgLlist} // 이미지 주소 리스트 
          dotColor="#000000" 
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: wp('100%'), height: hp('35%') }} // 이미지 Style 적용
        />
        <Shadow distance={2} offset={[0,2]} paintInside={false}>
          <View style={styles.content}>
            <CustomText>
              {mainContent}
            </CustomText>
          </View>
        </Shadow>
        <View style={styles.comments}>
          {commentList.map((row) => {
            return <Comment comment={row.text} />
          })}
        </View>
      </ScrollView>
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
  title: {
    width: wp('100%'),
    height: hp('10%'),
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical:3,
  },
  content: {
    // marginBottom:4,
    paddingVertical: 23,
    paddingHorizontal: 30,
    width: wp('100%'),
    // borderBottomColor:'#d4d4d4',
    // borderBottomWidth:1,
    backgroundColor:'white'
  },
  comments: {
    marginTop: 20,
    marginHorizontal:20,
    paddingBottom:20,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  icon: {
    width:45,
    height:45,
    backgroundColor: '#aaaaaa',
    borderRadius:25
  },
  inTitle: {
    paddingLeft: 10,
    paddingRight: 35
  },
  header: {
    width: wp('100%'),
    paddingTop: 20,
    paddingLeft: 5,
    paddingBottom: 10
  }
});
