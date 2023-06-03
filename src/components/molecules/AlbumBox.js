
import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import { CustomText } from "../atoms/Text";

export const AlbumBox = (props) => {
  return (
    <View style={styles.newCont}>
      <Pressable
        onPress={props.onPress ? props.onPress : null}>
        <View 
          style={styles.container} 
          >
            <Image 
              style={styles.image}
              source={{'uri': props.image}} 
            />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  newCont: {
    flex: 0.5
  },
  container: {
    margin: 1,
    flex: 1,
    // borderColor: '#111111',
    // borderStyle: 'solid',
    // borderWidth: 0.5,
    alignItems:'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  image: {
    flex: 4,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  }
})
