import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView } from 'react-native';
import { CustomText } from '../components/atoms/Text';
import { Header } from '../components/atoms/Header'
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Shadow} from 'react-native-shadow-2'
import { Comment } from '../components/molecules/Comment';
import { useState } from 'react';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';

export const AlarmList = ({navigation}) => {
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
        <AlarmBox/>
        <AlarmBox/>
        <AlarmBox/>
        <AlarmBox/>
      </ScrollView>
    <NavigationBottomBar navigation={navigation}/>
    </View>
  )
}

const AlarmBox = () => {
  return (
    <Pressable onPress={() => {console.log('www')}}>
      <View style={styles.alarmBox}>
        <CustomText style={{fontSize:17}}>000 게시글에 새로운 답글이 추가되었습니다.</CustomText>
        <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>2023-05-21</CustomText>
      </View>
    </Pressable>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    width: wp('100%'),
    paddingTop: 20,
    paddingLeft: 5,
    paddingBottom: 10
  },
  alarmBox : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomColor:'#eeeeee',
    borderBottomWidth:1,
    padding: 20
  }
});
