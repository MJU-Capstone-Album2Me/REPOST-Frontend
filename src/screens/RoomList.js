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
import { useEffect } from 'react';
import { getRoom } from '../util/room';
import { useSelector } from 'react-redux';

export const RoomList = ({navigation}) => {
  const data = albums()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    getRoom(token)
  }, [token])

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <Header>
      <Text style={styles.headerText}>공유 룸 전체보기</Text>
    </Header>
    <FlatList
        data={['','','alarm', 'add']}
        style={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          if (item.item == 'add') return <RoomBox addedBtn={true} />
          if (item.item == 'alarm') return <RoomBox hasAlarm={true} />
          else return (<RoomBox onPress={() => {navigation.navigate('home')}} />)
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
