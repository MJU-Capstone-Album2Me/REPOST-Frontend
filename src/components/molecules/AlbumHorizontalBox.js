
import { View, Text, Pressable, StyleSheet, Image, ScrollView, FlatList} from "react-native";
import { CustomText } from "../atoms/Text";
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'

export const AlbumHorizontalBox = ({children}) => {
  return (
    <ScrollView
    nestedScrollEnabled = {true}
      horizontal
      style={styles.container}
      pagingEnabled={false}
      showsHorizontalScrollIndicator={false}
      decelerationRate='fast'
      snapToAlignment={"center"}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'flex-end',
        borderColor: 'white',
        borderWidth: 1,
      }}>
        {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    maxHeight: 220,
    margin: 3
  },
  view: {
    height: 100,
    paddingHorizontal: 17,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
  },
})
