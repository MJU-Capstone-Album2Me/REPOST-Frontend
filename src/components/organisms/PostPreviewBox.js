
import { View, Text, Pressable, StyleSheet, TouchableHighlight, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from "../atoms/Text";
import { AlbumHorizontalBox } from "../molecules/AlbumHorizontalBox";

export const PostPreviewBox = ({ children, style, data, navigation }) => {
  return (
      <Pressable 
        style={styles.outerContainer}
        onPress={() => {navigation.navigate('post-detail')}}
        >
        <Text style={styles.headerText}>
        2004.05.26 엄마생신
        </Text>
        <AlbumHorizontalBox>
          {/* <Image source={{'uri':'https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?cs=srgb&dl=pexels-lukas-296282.jpg&fm=jpg'}}/> */}
          {
            data.map((row) => <Image style={styles.img} source={{'uri': row.profileUrl}}/>)
          }
        </AlbumHorizontalBox>
        <CustomText style={styles.content}>
        서프라이즈로 챙겨드렸던 기억이 나네
        아빠가 케이크 사오시고 아무도 모르는척 했..
        </CustomText>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  headerText: {
    paddingLeft: 12,
    paddingBottom:5,
    fontFamily: 'nexon-gothic-medium',
    fontSize: 20,
  },
  content: {
    marginTop:5,
    paddingLeft: 12,
    paddingRight: 40,
    fontSize:15
  },
  outerContainer: {
    margin: 0,
    width: wp('100%'),
    backgroundColor:'white',
    marginBottom: 20,
  },
  img: {
    width: 220,
    height: 220,
    marginHorizontal: 8
  }
})
