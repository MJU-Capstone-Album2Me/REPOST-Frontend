import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView } from 'react-native';
import { CustomText } from '../components/atoms/Text';
import { Header } from '../components/atoms/Header'
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Shadow} from 'react-native-shadow-2'
import { Comment } from '../components/molecules/Comment';
import { useEffect, useState } from 'react';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAlarm } from '../util/alarm';
import { responseJoinRoom } from '../util/room';
import {SubButton} from '../components/atoms/Buttons'
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import Toast from 'react-native-toast-message';
import { selectPost } from '../store/reducers/select';

export const AlarmList = ({navigation}) => {
  // route 
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  const token = useSelector((state) => state.auth.token)
  const [alarmList, setAlarmList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( async () => {
    const data = await getAlarm(token)
    setAlarmList(data)
    setLoading(false)
  }, [])
  
  // useEffect( async () => {
  //   roomHandeler()
  // }, [])

  // const roomHandeler = async () => {
  //   dispatch(clearRoom())
  //   const roomData = await getRoom(token)
  //   setRoomList(roomData)
  // }

  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay/> }
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
        {alarmList.map((row) => <AlarmBox object={row} navigation={navigation} />)}
      </ScrollView>
    {/* <NavigationBottomBar navigation={navigation}/> */}
    </View>
  )
}

const AlarmBox = ({object, navigation}) => {
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  if (object.type === 'APPLY') {
    if (object.approved == true) {
      return (
        <View style={styles.alarmBox}>
          <CustomText style={{fontSize:17}}>승인된 요청입니다</CustomText>
          <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>{object.pastTime}</CustomText>
        </View>)
    } else {
    return (
    <View style={styles.alarmBox}>
      <CustomText style={{fontSize:17}}>{object.message}</CustomText>
      <SubButton 
        onPress={ async () => {
          await responseJoinRoom(object.id, object.resourceId, token)
          return Toast.show({
            type: 'success',
            text1: '승인되었습니다',
          });
          }}>
      승인
      </SubButton>
      <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>{object.pastTime}</CustomText>
    </View>)}
  }
  else if (object.type === 'COMMENT' || object.type === 'REPLY') {
    return (
      <Pressable onPress={() => {
        dispatch(selectPost({postId: object.resourceId}))
        navigation.navigate('post-detail')
      }}>
        <View style={styles.alarmBox}>
          <CustomText style={{fontSize:17}}>{object.message}</CustomText>
          <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>{object.pastTime}</CustomText>
        </View>
      </Pressable>)
  }
  else if (object.type === 'ENTRANCE') {
    return (
      <View style={styles.alarmBox}>
        <CustomText style={{fontSize:17}}>{object.message}</CustomText>
        <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>{object.pastTime}</CustomText>
      </View>
    )
  }
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
    paddingTop: 40,
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
