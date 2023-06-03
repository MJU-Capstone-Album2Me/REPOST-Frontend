import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainTextInput } from '../components/atoms/TextInput';
import { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MainButton } from '../components/atoms/Buttons';
import { CustomText } from '../components/atoms/Text';
import { createUser } from '../util/auth';
import {Shadow} from 'react-native-shadow-2'
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/reducers/auth';

export const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [isIdFinished, setIsIdFinished] = useState(true)
  const [isPassFinished, setIsPassFinished] = useState(true)
  const [name, setName] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [birthday, setBirthday] = useState(null)

  const [inputValue, setInputValue] = useState({
    id: null,
    password: null,
    nickname: null,
  })

  const [errorValue, setErrorValue] = useState({
    id: false,
    password: false,
    nickname: false,
  })

  const [finished, setFinished] = useState({
    id: true,
    password: true,
    nickname: true
  })

  // input 형식 체크
  const idFormatter = (value) => {
    const regId = /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,19}$/;
    if (regId.test(value)) {
      setFinished((prev) => {
        return ({
          ...prev,
          id: false
        })
      })}
    else {
      setFinished((prev) => {
        return ({
          ...prev,
          id: true
        })
      })}
  }
  const passwordFormatter = (value) => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (regPass.test(value)) {
      setFinished((prev) => {
        return ({
          ...prev,
          password: false
        })
      })
    } else {
      setFinished((prev) => {
        return ({
          ...prev,
          password: true
        })
      })
    }
  }

  // 비동기 로딩 변수
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  return (
    <View style={styles.container}>
      {isAuthenticating ? <LoadingOverlay /> : null}
      <Shadow containerStyle={{width: wp('100%')}} distance={2}>
      <View style={styles.header}>
        <View 
          onTouchStart={()=> navigation.navigate(prevRoute)}
          style={{width:35, height:35, paddingBottom: 5}}>
          <Image 
            style={{width:'100%', height:'100%'}} source={require('../../assets/back.png')}/>
        </View>
        <Text style={{fontSize: 30,  fontFamily:'nexon-gothic-bold'}}>RE:POST</Text>
      </View>
      </Shadow>
      <ScrollView style={{ marginTop: 100, height:'100%'}}>
        <MainTextInput
          placeholder={"아이디"}
          setChange={(e) => {
            idFormatter(e)
            setErrorValue((prev) => {
                return ({
                  ...prev,
                  id: false
                })
            })
            setInputValue((prev) => {
              return ({
                ...prev,
                id: e
              })
            })
          }}
          isWrong={errorValue.id}
        />
        <CustomText style={styles.infoText}>{finished.id && '영문, 숫자 조합으로 4-20자리 입력해주세요'}</CustomText>
        <MainTextInput
          placeholder={"비밀번호"}
          setChange={(e) => {
            passwordFormatter(e)
            setErrorValue((prev) => {
              return ({
                ...prev,
                password: false
              })
            })
            setInputValue((prev) => {
              return ({
                ...prev,
                password: e
              })
            })
          }}
          isWrong={errorValue.password}
          secure={true}
        />
        <CustomText style={styles.infoText}>{finished.password && '영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요.'}</CustomText>
        <View style={{height:30}}></View>
        {/* <MainTextInput
          placeholder={"이름"}
          setChange={setName}
        /> */}
        <MainTextInput
          placeholder={"닉네임"}
          setChange={(e) => {
            setErrorValue((prev) => {
              return ({
                ...prev,
                nickname: false
              })
            })
            setInputValue((prev) => {
              return ({
                ...prev,
                nickname: e
              })
            })
          }}
          isWrong={errorValue.nickname}
        />
        {/* <MainTextInput
          placeholder={"생년월일 8자리"}
          setChange={setBirthday}
          // isWrong={true}
        /> */}
        <View style={{height:30}}></View>
        <MainButton 
          style={{width: wp('80%')}}
          onPress={ async () => {
            let cnt = 0
            Object.keys(inputValue).forEach((key) => {
              if (inputValue[key] == null || inputValue[key].replace(/\s/g, '').length == 0) {
                setErrorValue((prev) => { return ({...prev, [key]: true})})
                cnt += 1 
              }
            })
            if (cnt>0) {
              alert('모든 항목을 작성해주세요')
            } else {
              setIsAuthenticating(true)
              const token = await createUser(inputValue.id, inputValue.password, inputValue.nickname)
              dispatch(authenticate({'token': token}))
              setIsAuthenticating(false)
            }
            // navigation.navigate('login')
          }}>
          <CustomText>
            회원가입
          </CustomText>
        </MainButton>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
    width: wp('100%'),
    display:'flex',
    alignItems:'center',
  },
  subContainer: {
    padding:20
  },
  header: {
    width: wp('100%'),
    paddingTop: 30,
    paddingLeft: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'flex-end',
  },
  infoText: {
    paddingHorizontal: 20,
    fontSize:12,
    marginBottom: 8,
  }
});
