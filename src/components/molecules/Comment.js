
import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity} from "react-native";
import { CustomText } from "../atoms/Text";
import {Shadow} from 'react-native-shadow-2'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Comment = ({comment, profileImageUrl, nickname, onPress, isReply}) => {
  return (
    <Shadow distance={2} offset={[0,1]} paintInside={false} containerStyle={isReply ? styles.replyOuterContainer : styles.outerContainer}>
      <TouchableOpacity onPress={onPress} style={isReply ? styles.replyContainer: styles.container}>
        <View style={styles.icon}>
          <Image 
            style={{width:'100%', height:'100%', borderRadius:20}} source={{'uri': profileImageUrl}}/>
        </View>
        <View style={{display:'flex', flexDirection: 'column'}}>
          <Text style={[styles.textContainer, {fontSize:10}]}>{nickname}</Text>
          <CustomText style={[styles.textContainer, {paddingTop: 2}]}>{comment}</CustomText>
        </View>
      </TouchableOpacity>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  replyOuterContainer: {
    marginVertical:5
  },
  outerContainer: {
    marginVertical:8,
  },
  icon: {
    backgroundColor:'#dddddd',
    width:40,
    height:40,
    borderRadius:20
  },
  replyContainer: {
    width: wp('80%'),
    paddingHorizontal:20,
    paddingVertical: 5,
    backgroundColor:'#eeeeee',
    borderRadius: 13,
    display: 'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  container: {
    width: wp('90%'),
    paddingHorizontal:20,
    paddingVertical: 5,
    backgroundColor:'white',
    borderRadius: 13,
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
