import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { CustomText } from '../components/atoms/Text';

export const PostList = ({ route }) => {
  const { id } = route.params;
  console.log(route.params);
  return (
    <View style={styles.container}>
      <CustomText>id는 {JSON.stringify(id)} </CustomText>
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
    padding: 15
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
