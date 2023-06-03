import { StyleSheet, Text, View, Button, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainTextInput } from '../components/atoms/TextInput';
import { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MainButton } from '../components/atoms/Buttons';
import { CustomText } from '../components/atoms/Text';

export const PostWriteScreen = ({navigation}) => {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {navigation.navigate(prevRoute)}}>
          <Text style={{fontSize:22, color:'#aaaaaa', fontFamily: 'nexon-gothic-medium'}}>이전</Text>
        </Pressable>  
        <Pressable onPress={() => {navigation.navigate('post-write')}}>
          <Text style={{fontSize:22, color:'#206CFF', fontFamily: 'nexon-gothic-medium'}}>다음</Text>
        </Pressable>      
      </View>
      <ScrollView style={{marginTop: 30, padding:20,  width:'100%'}}>
        <MainTextInput
          placeholder={"제목"}
          setChange={setTitle}
        />
        <TextInput 
          multiline 
          placeholder="내용"
          style={styles.multiText} />
          
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
    paddingTop: 35,
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
