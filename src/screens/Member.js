import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import { CustomText } from '../components/atoms/Text';
import { Header } from '../components/atoms/Header'
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Shadow} from 'react-native-shadow-2'
import { Comment } from '../components/molecules/Comment';
import { useCallback, useEffect, useState } from 'react';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getRoomMember } from '../util/room';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { useFocusEffect } from '@react-navigation/native';


export const MemberList = ({navigation}) => {
  // route 
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const token = useSelector((state) => state.auth.token)
  const room = useSelector((state) => state.selection.room)
  const [memberList, setMemberList] = useState([])
  const [loading, setLoading] = useState(true)

  const roomInviteCode = useSelector((state) => state.selection.roomInviteCode)

  const mockdatas = [
    {'nickname': '민정이 친구', 'createDt': '2023-05-21'},
    {'nickname': '민정이 친구', 'createDt': '2023-05-21'},
    {'nickname': '민정이 친구', 'createDt': '2023-05-21'},
  ]

  const showToast = () => {
    return Toast.show({
      type: 'success',
      text1: '복사가 완료되었습니다',
      // text2: 'This is some something 👋'
    });
  }

  useEffect( async () => {
  }, []) 

  useFocusEffect(
    useCallback( async () => {
      const data = await getRoomMember(token, room)
      setMemberList(data)
      setLoading(false)
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []))

  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay />}
      <Header>
        <Text style={styles.headerText}>멤버</Text>
        <Pressable
          onPress={() => {navigation.navigate('alarm-list')}}>
          <Image 
            style={{width:28, height:28, marginRight:10, marginBottom: 3}} 
            source={require('../../assets/bell.png')}/>
        </Pressable>
      </Header>
      {/* <FlatList
        // style={styles.container}
        data={mockdatas}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
              <MemberBox 
                key={item.index}  
                nickname={item.item.nickname}
                createDt={item.item.createDt}
              />
          )
        }}
        numColumns={1}
        // alwaysBounceVertical={false}
      /> */}
      <ScrollView>
        {memberList.map((row, idx) => 
          <MemberBox
            key={idx}
            nickname={row.name}
            createDt={row.joinedAt}
            profile={row.profile_url}
          />
        )}
        <CopyBox 
          onPress={() => {
            Clipboard.setString(roomInviteCode) 
            showToast()
          }}
        />
      </ScrollView>
    {/* <NavigationBottomBar navigation={navigation}/> */}
    </View>
  )
}



const MemberBox = ({nickname, createDt, onPress, profile}) => {
  const [loading, setLoading] = useState(true)

  return (
    <Pressable onPress={onPress}>
      <View style={styles.MemberBox}>
        <Image 
          style={{width:50, height:50, marginRight:10, marginBottom: 3, borderRadius:30}} 
          source={loading ? require('../../assets/Loading_icon.gif') :{'uri':  profile}}
          onLoad={()=>{setLoading(false)}}
          />      
        <View style={{display:'flex', flexDirection:'column'}}>
          <CustomText style={{fontSize:17}}>{nickname}</CustomText>
          <CustomText style={{alignSelf: 'flex-end', paddingTop:8, fontSize:13, color:'#aaaaaa'}}>{createDt}</CustomText>
        </View>
      </View>
    </Pressable>)
}

const CopyBox = (props) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      >
      <View style={styles.CopyBox}>
          <CustomText style={{fontSize:17}}>초대링크 복사하기</CustomText>
      </View>
    </TouchableOpacity>
)}

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
  MemberBox : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    borderBottomColor:'#eeeeee',
    borderBottomWidth:1,
    marginHorizontal: 30,
    paddingVertical:10
  },
  headerText: {
    fontSize: 25,
    fontFamily:'nexon-gothic-medium'
  },
  CopyBox : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderColor:'#bbbbbb',
    borderRadius:10,
    borderWidth:1,
    marginHorizontal: 60,
    paddingVertical: 20,
    marginTop: 10,
  },
});
