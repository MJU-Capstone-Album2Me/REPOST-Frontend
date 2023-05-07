import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';

export const AlbumList = () => {
  data = albums()
  return (
    <View style={styles.container}>
      <FlatList
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
});
