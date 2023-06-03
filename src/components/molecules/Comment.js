
import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import { CustomText } from "../atoms/Text";
import {Shadow} from 'react-native-shadow-2'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Comment = ({comment}) => {
  return (
    <Shadow distance={5} offset={[2,3]} paintInside={false} containerStyle={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.icon}></View>
        <CustomText style={styles.textContainer}>{comment}</CustomText>
      </View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    // width: wp('100%'),
    marginVertical:8,
  },
  icon: {
    backgroundColor:'black',
    width:40,
    height:40,
    borderRadius:20
  },
  container: {
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:'white',
    borderRadius: 13,
    width:wp('82%'),
    display: 'flex',
    flexDirection:'row',
    alignItems:'center'
    // elevation: 1,
    // margin: 10,
    // flex: 1,
    // borderColor: '#111111',
    // borderStyle: 'solid',
    // borderWidth: 0.5,
    // alignItems:'center',
    // justifyContent: 'center',
    // display: 'flex',
    // flexDirection: 'column',
    // shadowColor: 'black',
    // shadowOpacity: 0.25,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 2,
    // backgroundColor: 'white',
    // elevation: 1
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 35
  }
})
