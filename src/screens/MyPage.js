import { StyleSheet, Text, View, Button, FlatList, Pressable, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { CustomText } from '../components/atoms/Text';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../components/atoms/Header'
import { useCallback, useEffect, useState } from 'react';
import { ProfileCameraGalleryDialog } from '../components/molecules/PopupDialog';
import { getProfile } from '../util/auth';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { selectProfileUrl } from '../store/reducers/select';
import { useFocusEffect } from '@react-navigation/native';

export const MyPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [dialog, setDialog] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const [profileUrl, setProfileUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)
  const pf = useSelector((state) => state.selection.profileUrl)
  
  useFocusEffect(
    useCallback( async () => {
      setLoading(true)
      const profile = await getProfile(token)
      dispatch(selectProfileUrl({profileUrl: profile}))
      // setProfileUrl(profile)
      setLoading(false)
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []))

  useEffect( async () => {
    setLoading(true)
    const profile = await getProfile(token)
    dispatch(selectProfileUrl({profileUrl: profile}))
    // setProfileUrl(profile)
    setLoading(false)
  }, [dialog])

    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
  return (
    <View style={styles.container}>
      { loading && <LoadingOverlay/> }
      <Header>
        <Text style={styles.headerText}>설정</Text>
        <TouchableOpacity
          onPress={() => {dispatch(logout())}}>
          <Image  style={{width:28, height:28, marginRight:10, marginBottom: 3}} source={require('../../assets/logout.png')}/>
        </TouchableOpacity>
      </Header>
      <View style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:30, width:'100%'}}>
        <Image 
          style={{width:100, height:100, marginRight:10, marginBottom: 3, borderRadius:30}} 
          source={imgLoading? require('../../assets/Loading_icon.gif') : {'uri': pf}}
          onLoad={()=>{setImgLoading(false)}}
          placeholder={ Platform.OS == 'android' ? null : blurhash }/>
        <TouchableOpacity 
          onPress={() => {setDialog(true)}}
          >
            <View style={styles.profileBox}>
                <CustomText style={{fontSize:17}}>프로필 이미지 수정</CustomText>
            </View>
        </TouchableOpacity>
        <ProfileCameraGalleryDialog   
          visible={dialog} 
          setVisible={setDialog}
          setProfileUrl={setProfileUrl}
          />
      </View>
      {/* <FlatList
        data={albums()}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <AlbumBox 
              key={item.index}  
              image={item.item.profileUrl}
              title={item.item.name}
            />
          )
        }}
        numColumns={1}
        // alwaysBounceVertical={false}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 25,
    fontFamily:'nexon-gothic-medium'
  },
  profileBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderColor:'#bbbbbb',
    borderRadius:10,
    borderWidth:1,
    // marginHorizontal: 60,
    paddingVertical: 20,
    paddingHorizontal:30,
    marginTop: 10,
  }
});
