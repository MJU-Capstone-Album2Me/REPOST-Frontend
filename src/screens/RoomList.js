import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { AlbumHorizontalBox } from '../components/molecules/AlbumHorizontalBox';
import { Header } from '../components/atoms/Header';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { PostPreviewBox } from '../components/organisms/PostPreviewBox';
import { CustomText } from '../components/atoms/Text';
import { RoomBox } from '../components/molecules/RoomBox';
import { useEffect, useState } from 'react';
import { getRoom } from '../util/room';
import { useDispatch, useSelector } from 'react-redux';
import { clearRoom, selectRoom } from '../store/reducers/select';
import { setRoomInviteCode } from '../store/reducers/select';
import { getRoomInviteCode } from '../util/room';

export const RoomList = ({navigation}) => {
  const data = albums()
  const token = useSelector((state) => state.auth.token)
  const [roomList, setRoomList] = useState([])
  const dispatch = useDispatch()

  useEffect( async () => {
    roomHandeler()
  }, [])

  const roomHandeler = async () => {
    dispatch(clearRoom())
    const roomData = await getRoom(token)
    console.log(roomData)
    setRoomList(roomData)
  }

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <Header>
      <Text style={styles.headerText}>공유 룸 전체보기</Text>
    </Header>
    <FlatList
        data={[...roomList, {id:'add', name:'add'}]}
        style={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          if (item.item.id == 'add') return <RoomBox addedBtn={true} roomHandeler={roomHandeler} />
          // if (item.item.id == 'alarm') return <RoomBox hasAlarm={true} />
          else return (
            <RoomBox 
              name={item.item.name} 
              membersCount={item.item.membersCount}
              onPress={ async () => {
                dispatch(selectRoom({'roomId': item.item.id, 'roomNm': item.item.name}))
                const roomCode = await getRoomInviteCode( token, item.item.id)
                dispatch(setRoomInviteCode({'roomInviteCode': roomCode}))
                navigation.navigate('home')}
              } />)
        }}
        numColumns={2}
        // alwaysBounceVertical={false}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    width: 220,
    height: 220,
    marginHorizontal: 8
  },
  headerText: {
    fontSize: 25,
    fontFamily:'nexon-gothic-medium'
  }
});
