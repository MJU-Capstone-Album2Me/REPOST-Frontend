import { StyleSheet, Text, View, Button, FlatList, Pressable,Image, ScrollView,SafeAreaView,RefreshControl, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { AlbumHorizontalBox } from '../components/molecules/AlbumHorizontalBox';
import { Header } from '../components/atoms/Header';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';
import { PostPreviewBox } from '../components/organisms/PostPreviewBox';
import { CustomText } from '../components/atoms/Text';
import { getPosts } from '../util/post';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../components/organisms/LoadingOverlay';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
   

export const AlbumList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback( async () => {
    setRefreshing(true);
    const getData = await getPosts(token, room, 100000)
    console.log(getData)
    setPostList(getData)
    setCursor((prev) => 3)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const token = useSelector((state) => state.auth.token)
  const room = useSelector((state) => state.selection.room)
  const title = useSelector((state) => state.selection.roomNm)
  const [postList, setPostList] = useState([])
  const [cursor, setCursor] = useState(0)
  const [loading, setLoading] = useState(false)
  let onEndReachedCalledDuringMomentum = false

  useEffect( async () => {
    setLoading(true)
    const getData = await getPosts(token, room, 100000)
    console.log(getData)
    setPostList(getData)
    setCursor((prev) => 3)
    setLoading(false)
  }, [])

  const handleOnEndReached = async () => {
    if (postList.length < cursor) {}
    else {
      setCursor((prev) => prev+3)
      setLoading(true)
      const getData = await getPosts(token, room, postList[postList.length-1].id)
      setPostList((prev) => [...prev, ...getData])
      setLoading(false)
    }
  }

  return (
    <View style={{flex:1, backgroundColor:'#ffffff'}}>
      {loading && <LoadingOverlay/>}
    <Header>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable
        onPress={() => {navigation.navigate('alarm-list')}}>
        <Image style={{width:28, height:28, marginRight:10, marginBottom: 3}} source={require('../../assets/bell.png')}/>
      </Pressable>
    </Header>
    <View style={styles.container}>
    <ScrollView
    nestedScrollEnabled = {true}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          handleOnEndReached(); 
        }
      }}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {postList.map((item, idx) => 
        <PostPreviewBox 
          key={idx}
          data={item} 
          navigation={navigation}/>)}

    </ScrollView>
    {/* <FlatList
        data={postList}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <PostPreviewBox 
              key={item.index}
              data={item.item} 
              navigation={navigation}/>
          )
        }}
        onEndReached = {() => {
          if (!onEndReachedCalledDuringMomentum) {
            handleOnEndReached();    // LOAD MORE DATA
            onEndReachedCalledDuringMomentum = true;
          }
        }}
        onEndReachedThreshold = {0.5}
        onMomentumScrollBegin = {() => {
          onEndReachedCalledDuringMomentum = false;}}
        // onEndReached={postList.length < cursor? null: handleOnEndReached}
        numColumns={1}
        // alwaysBounceVertical={false}
      /> */}
      </View>
    {/* <FlatList>
      <View style={styles.container}>
        {postList.map((row) => 
          <PostPreviewBox 
            data={row} 
            navigation={navigation}/>
        )}
      </View>
    </FlatList> */}
    
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
