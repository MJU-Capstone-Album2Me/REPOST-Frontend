import { StyleSheet, Text, View, Button, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlbumBox } from '../components/molecules/AlbumBox';
import { albums } from '../mockdatas/album-list';
import { CustomText } from '../components/atoms/Text';
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducers/auth';

export const MyPage = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {dispatch(logout())}}>
        <CustomText>로그아웃</CustomText>
      </Pressable>
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
