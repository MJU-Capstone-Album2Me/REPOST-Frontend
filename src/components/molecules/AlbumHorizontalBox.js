
import { View, Text, Pressable, StyleSheet, Image, ScrollView} from "react-native";
import { CustomText } from "../atoms/Text";

export const AlbumHorizontalBox = ({children}) => {
  return (
    <ScrollView
      style={styles.container}
      pagingEnabled={false}
      horizontal= {true}
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
