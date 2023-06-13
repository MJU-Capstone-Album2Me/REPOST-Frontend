
import { View, Text, Pressable, StyleSheet, TouchableHighlight, Platform, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";
import { CustomText } from "../atoms/Text";
import { AlbumHorizontalBox } from "../molecules/AlbumHorizontalBox";
import { selectPost } from "../../store/reducers/select";
import { Image } from 'expo-image';

export const PostPreviewBox = ({ children, style, data, navigation }) => {
  const dispatch = useDispatch()
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
      <Pressable 
        style={styles.outerContainer}
        onPress={() => {
          dispatch(selectPost({postId: data.id}))
          navigation.navigate('post-detail')
        }}
        >
        <Text style={styles.headerText}>
        {data.title}
        </Text>
        <AlbumHorizontalBox>
          {
            data.images.map((row) => 
            <TouchableWithoutFeedback>
              <Pressable 
                onPress={() => {          
                  dispatch(selectPost({postId: data.id}))
                  navigation.navigate('post-detail')}}>
              <Image 
                style={styles.img} 
                source={{'uri': row.postImageUrl}} 
                // placeholder={ Platform.OS == 'android' ? null : blurhash }
                id={row.id}/>
              </Pressable>
              </TouchableWithoutFeedback>)
          }
        </AlbumHorizontalBox>
        <CustomText style={styles.content}>
          {data.contents}
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
    // width: wp('100%'),
    backgroundColor:'#ffffff',
    marginBottom: 20,
    flex:1
  },
  img: {
    width: 220,
    height: 220,
    marginHorizontal: 8
  }
})
