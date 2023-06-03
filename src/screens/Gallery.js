import { StyleSheet, Text, View, Button, FlatList, Pressable, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { Header } from '../components/atoms/Header';
import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';

export const Gallery = ({navigation}) => {
  data = albums()
  return (
    <>
      <Header>
        <Text style={styles.headerText}>갤러리</Text>
        <Pressable
          onPress={() => {navigation.navigate('alarm-list')}}>
          <Image style={{width:28, height:28, marginRight:10, marginBottom: 3}} source={require('../../assets/bell.png')}/>
        </Pressable>
      </Header>
      <FlatList
        style={styles.container}
        data={albums()}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
              <AlbumBox 
                key={item.index}  
                image={item.item.profileUrl}
                title={item.item.name}
                onPress={() => {
                  navigation.navigate('post-detail',{id: item.index })
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
