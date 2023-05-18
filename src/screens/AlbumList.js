import { StyleSheet, Text, View, Button, FlatList, Pressable,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { AlbumHorizontalBox } from '../components/molecules/AlbumHorizontalBox';

export const AlbumList = ({navigation}) => {
  const data = albums()
  return (
    <View style={styles.container}>
      <AlbumHorizontalBox>
        {/* <Image source={{'uri':'https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?cs=srgb&dl=pexels-lukas-296282.jpg&fm=jpg'}}/> */}
        {
          data.map((row) => <Image style={styles.img} source={{'uri': row.profileUrl}}/>)
        }
      </AlbumHorizontalBox>
      {/* <FlatList
        data={albums()}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            
              // <AlbumBox 
              //   key={item.index}  
              //   image={item.item.profileUrl}
              //   title={item.item.name}
              //   onPress={() => {
              //     navigation.navigate('post-list',{id: item.index })
              //   }}
              // />
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
    padding: 15
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    width: 220,
    height: 220,
    marginHorizontal: 8
  }
});
