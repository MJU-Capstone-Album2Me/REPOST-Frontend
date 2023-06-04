
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from "./Text";

export const Header = ({ children, style, headerText }) => {
  return (
      <View style={styles.headerOuter}>
        <View style={[styles.headerInner, style]}>
          {children}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  headerOuter: {
    margin: 0,
    width: wp('100%'),
    height: 100,
    backgroundColor:'white',
    display:'flex',
    paddingTop:20,
    // borderBottomColor: '#000000',
    // borderBottomWidth: 1
  },
  headerInner: {
    flex:1,
    // backgroundColor:'red',
    marginHorizontal: 25,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingLeft:5,
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 25,
    fontWeight: 700
  }
})
