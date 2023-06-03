import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { AlbumHorizontalBox } from '../components/molecules/AlbumHorizontalBox';
import { Header } from '../components/atoms/Header';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { PostPreviewBox } from '../components/organisms/PostPreviewBox';
import { CustomText } from '../components/atoms/Text';

export const AlbumList = ({navigation}) => {
  const data = albums()
  let title = '일상의 기록들'
  return (
    <>
    <Header>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable
        onPress={() => {navigation.navigate('alarm-list')}}>
        <Image style={{width:28, height:28, marginRight:10, marginBottom: 3}} source={require('../../assets/bell.png')}/>
      </Pressable>
    </Header>
    <ScrollView>
      <View style={styles.container}>
        <PostPreviewBox data={data} navigation={navigation}/>
        <PostPreviewBox data={data} navigation={navigation}/>
        <PostPreviewBox data={data} navigation={navigation}/>
        <PostPreviewBox data={data} navigation={navigation}/>
      </View>
    </ScrollView>
    </>
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
