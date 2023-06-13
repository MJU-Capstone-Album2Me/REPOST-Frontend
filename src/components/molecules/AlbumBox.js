
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, ActivityIndicator} from "react-native";
import { CustomText } from "../atoms/Text";

export const AlbumBox = (props) => {
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const [loading, setLoading] = useState(true)

  return (
    <View style={styles.newCont}>
      <Pressable
        onPress={props.onPress ? props.onPress : null}>
        <View 
          style={styles.container} 
          >
            <Image 
              style={styles.image}
              source={loading? require('../../../assets/Loading_icon.gif') :{'uri': props.image}} 
              placeholder={ Platform.OS == 'android' ?  null: blurhash }
              onLoad={()=>{setLoading(false)}}
              // onLoadStart={setLoading(true)}
              // onLoadEnd={setLoading(false)}
            />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  newCont: {
    flex: 1,
    flexDirection: 'row'
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
    // flex: 4,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  }
})
