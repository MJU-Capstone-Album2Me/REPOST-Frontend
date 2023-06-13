import { StyleSheet, Text, View, Button, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainTextInput } from '../components/atoms/TextInput';
import { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MainButton } from '../components/atoms/Buttons';
import { CustomText } from '../components/atoms/Text';
import { createPost } from '../util/post'
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import Toast from 'react-native-toast-message';
import { clearImgsArr } from '../store/reducers/imgs';


export const PostWriteScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const token = useSelector((state) => state.auth.token)
  const room = useSelector((state) => state.selection.room)
  const imgsArr = useSelector((state) => state.imgs.imgsArr)
  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay/>}
      <View style={styles.header}>
        <Pressable onPress={() => {navigation.navigate(prevRoute)}}>
          <Text style={{fontSize:22, color:'#aaaaaa', fontFamily: 'nexon-gothic-medium'}}>이전</Text>
        </Pressable>  
        <Pressable onPress={ async () => {
          setLoading(true)
          await createPost({
            roomId: room, 
            title: title, 
            content: content, 
            imgList: imgsArr, 
            token: token
          })
          setLoading(false)
          dispatch(clearImgsArr())
          Toast.show({
            type: 'success',
            text1: '포스트 작성이 완료되었습니다',
            // text2: '관리자의 승인을 기다려주세요 .'
          });
          navigation.navigate('home')
        }}>
          <Text style={{fontSize:22, color:'#206CFF', fontFamily: 'nexon-gothic-medium'}}>업로드</Text>
        </Pressable>      
      </View>
      <ScrollView style={{marginTop: 30, padding:20,  width:'100%'}}>
        <MainTextInput
          placeholder={"제목"}
          setChange={setTitle}
          maxLength={50}
        />
        <TextInput 
          multiline 
          placeholder="내용"
          style={styles.multiText} 
          onChangeText={setContent}
          maxLength={100}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    width: wp('100%'),
    // display:'flex',
    alignItems:'center'
  },
  header: {
    width: wp('100%'),
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingBottom: 10,
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multiText: {
    height: 240,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginVertical: 3,
    marginHorizontal: 17,
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
});
