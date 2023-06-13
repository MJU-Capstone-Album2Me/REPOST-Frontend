import { StyleSheet, 
  Text, 
  View, 
  Button, 
  Image, 
  ScrollView, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableOpacity, 
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { CustomText } from '../components/atoms/Text';
import { Header } from '../components/atoms/Header'
import { SliderBox } from 'react-native-image-slider-box';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Shadow} from 'react-native-shadow-2'
import { Comment } from '../components/molecules/Comment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail
  ,postReply 
  ,postComment
} from '../util/post';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import Toast from 'react-native-toast-message';

export const PostDetailScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [titleMsg, setTitleMsg] = useState('')
  const [author, setAuthor] = useState('')
  const [imgLlist, setImgList] = useState(['https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?cs=srgb&dl=pexels-lukas-296282.jpg&fm=jpg','https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?cs=srgb&dl=pexels-daniel-reche-1556691.jpg&fm=jpg'])
  const [mainContent, setMainContent] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [commentList, setCommentList] = useState([])
  const [comment, setComment] = useState(null)
  const [reply, setReply] = useState({
    isReply: false,
    commentId: null,
    nickname: null,
  })
  const [isVisibleKeyboard, setIsVisibleKeyboard] = useState(false)

  const room = useSelector((state) => state.selection.room)
  const token = useSelector((state) => state.auth.token)
  const post = useSelector((state) => state.selection.post)

  useEffect( async () => {
    const data = await getPostDetail(token, room, post)
    setMainContent(data.contents)
    setTitleMsg(data.title)
    setImgList(data.images.map((row) => row.postImageUrl))
    setAuthor(data.nickname)
    setProfileImg(data.profileImageUrl)
    setCommentList(data.comments)
    setLoading(false)
    console.log(data)
  }, [])
  
  Keyboard.addListener('keyboardWillShow', () => {
    setIsVisibleKeyboard(true)
  })
  Keyboard.addListener('keyboardWillHide', () => {
    setIsVisibleKeyboard(false)
  })

  // route 
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  
  return (
    <View style={styles.container}>
      {<LoadingOverlay /> && loading}
      <Shadow containerStyle={{width: wp('100%')}} distance={2}>
        <View style={styles.header}>
          <View 
            onTouchStart={()=> navigation.navigate(prevRoute)}
            style={{width:35, height:35}}>
          <Image 
            style={{width:'100%', height:'100%'}} source={require('../../assets/back.png')}/>
          </View>
        </View>
      </Shadow>
      {/* 작성중인 댓글창 */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior="position"
      >
        {reply.isReply && 
          <View style={styles.reply}>
            <TouchableOpacity 
              onPress={() => {
                setReply((prev) => ({
                  isReply: false,
                  commentId: null,
                  nickname: null,
                }))
              }}>
              <Text>{reply.nickname}에게 답글 작성중</Text>
            </TouchableOpacity>
          </View>}
        <View style={styles.keyboardOutline}>
          <View 
            style={styles.keyboard}>
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
              <TextInput
                style={styles.input}
                value={comment}
                onChangeText={setComment}
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
              />
              <Button
                onPress={() => {
                  if (comment) {
                    Keyboard.dismiss()
                    if (reply.isReply) {
                      postReply(token, room, post, reply.commentId, comment)
                      .then(() => {
                        getPostDetail(token, room, post).then((data) => {
                          setCommentList(data.comments)
                        })
                      })
                    } else {
                      postComment(token, room, post, comment)
                      .then(() => {
                        getPostDetail(token, room, post).then((data) => {
                          console.log(data)
                          setCommentList(data.comments)
                        })
                      })
                    }
                    setComment(null)
                    setReply({
                      isReply: false,
                      commentId: null,
                      nickname: null,
                    })
                    return Toast.show({
                      type: 'success',
                      text1: '댓글 작성이 완료되었습니다',
                    });
                  } else {
                    return Toast.show({
                      type: 'error',
                      text1: '내용을 작성해주세요',
                    });
                  }
                }} 
                title='게시' 
                color={comment? null : 'grey'} 
              />
              {/* </TouchableWithoutFeedback> */}
            </View>
          </View>
      </KeyboardAvoidingView>
      {/* 댓글 리스트 */}
      <ScrollView style={{marginBottom: isVisibleKeyboard ? 370 : 90}}>
        <View style={styles.title}>
          <View style={styles.icon}>
            <Image 
              style={{width:'100%', height:'100%', borderRadius:20}} source={{'uri': profileImg}}/>
          </View>
          <View style={styles.inTitle}>
            <Text style={{fontSize:17, fontFamily: 'nexon-gothic-medium'}}>{titleMsg}</Text>
            <CustomText style={{fontSize:12}}>{author}</CustomText>
          </View>
        </View>
        <SliderBox
            autoplay={false}  //자동 슬라이드 넘김
            circleLoop={false} //맨끝 슬라이드에서 다시 첫슬라이드로
            resizeMode="cover"  // 이미지 사이즈 조절값
            images={imgLlist} // 이미지 주소 리스트 
            dotColor="#000000" 
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: wp('100%'), height: hp('35%') }} // 이미지 Style 적용
          />
          <Shadow distance={2} offset={[0,2]} paintInside={false}>
            <View style={styles.content}>
              <CustomText>
                {mainContent}
              </CustomText>
            </View>
          </Shadow>
          <View style={styles.comments}>
            {commentList.map((row) => {
              return (
                <>
                <Comment 
                  comment={row.contents} 
                  profileImageUrl={row.profileImageUrl} 
                  nickname={row.nickname}
                  onPress={() => {
                    setReply((prev) => ({
                      isReply: true,
                      commentId: row.id,
                      nickname: row.nickname,
                    }))
                  }}
                />
                { row.replies &&
                  row.replies.map((reply) => {
                    console.log(reply)
                    return (
                      <Comment 
                        comment={reply.content} 
                        profileImageUrl={reply.profileImageUrl} 
                        nickname={reply.nickname}
                        isReply={true}
                      />
                    )
                  })
                }
                </>
              )
            })}
          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    width: wp('100%'),
    height: hp('10%'),
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical:3,
  },
  content: {
    // marginBottom:4,
    paddingVertical: 23,
    paddingHorizontal: 30,
    width: wp('100%'),
    // borderBottomColor:'#d4d4d4',
    // borderBottomWidth:1,
    backgroundColor:'white'
  },
  comments: {
    marginTop: 20,
    marginHorizontal:20,
    paddingBottom:20,
    display:'flex',
    flexDirection:'column',
    alignItems: 'flex-end',
  },
  icon: {
    width:45,
    height:45,
    backgroundColor: '#aaaaaa',
    borderRadius:25
  },
  inTitle: {
    paddingLeft: 10,
    paddingRight: 35
  },
  header: {
    width: wp('100%'),
    paddingTop: 40,
    paddingLeft: 5,
    paddingBottom: 10
  },
  input: {
    flex:1,
    fontSize: 13,
    paddingVertical: 8, // 상하단 패딩
    paddingLeft: 10,
    // backgroundColor:'black'
  },
  keyboardAvoid: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor:'white', 
    zIndex: 100,
    // paddingBottom:20,
  },
  keyboard: {
    flex:1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    margin:15,
    marginBottom: 20,
    borderColor:'#dddddd',
    borderWidth:1,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    height: 45,
  },
  keyboardOutline: {
    backgroundColor:'white', 
    display:'flex', 
    // height: 90, 
    justifyContent:'center', 
    alignItems:'center',
    zIndex:100,
    borderTopColor:'#eeeeee',
    borderTopWidth:1,
    paddingBottom:10
  },
  reply:{
    backgroundColor:'#eeeeee',
    paddingVertical:10,
    paddingHorizontal:10,
    color:'#222222'
  }
});
