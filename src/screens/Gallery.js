import { StyleSheet, Text, View, Button, FlatList, Pressable, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { Header } from '../components/atoms/Header';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { useCallback, useDebugValue, useEffect, useState } from 'react';
import { getGallery } from '../util/post';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../store/reducers/select';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { useFocusEffect } from '@react-navigation/native';

export const Gallery = ({navigation}) => {
  const [cursor, setCursor] = useState(0)
  const token = useSelector((state) => state.auth.token)
  const room = useSelector((state) => state.selection.room)
  const [galleryData, setGalleryData] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect( async () => {

  }, [])

  useFocusEffect(
    useCallback( async () => {
      const data = await getGallery(token, room, 100000)
      setGalleryData(data)
      setLoading(false)
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []))

  return (
    <>
      {loading && <LoadingOverlay />}
      <Header>
        <Text style={styles.headerText}>갤러리</Text>
        <Pressable
          onPress={() => {navigation.navigate('alarm-list')}}>
          <Image style={{width:28, height:28, marginRight:10, marginBottom: 3}} source={require('../../assets/bell.png')}/>
        </Pressable>
      </Header>
      <FlatList
        style={styles.container}
        data={galleryData}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
              <AlbumBox 
                key={item.index}  
                image={item.item.postImageUrl}
                onPress={() => {
                  dispatch(selectPost({postId: item.item.postId}))
                  navigation.navigate('post-detail')
                }}
              />
          )
        }}
        numColumns={3}
        // alwaysBounceVertical={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 25
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    fontFamily:'nexon-gothic-medium'
  }
});
