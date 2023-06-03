
import { View, Text, Pressable, StyleSheet, Image, ScrollView} from "react-native";
import { CustomText } from "../atoms/Text";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PostAlbumBox = ({children}) => {
  return (
    <ScrollView
      style={styles.container}
      pagingEnabled={true}
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
})
