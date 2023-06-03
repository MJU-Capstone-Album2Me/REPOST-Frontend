import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainButton } from '../components/atoms/Buttons';
import { MainTextInput } from '../components/atoms/TextInput';
import { Title } from '../components/atoms/Title';
import { CustomText } from '../components/atoms/Text';
import { useEffect, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { authenticate } from '../util/auth';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import * as redux from '../store/reducers/auth';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  
  useEffect(() => {
    console.log('redux', isAuthenticated)
  }, [token])

  const [inputValue, setInputValue] = useState({
    id: null,
    password: null,
  })

  const [errorValue, setErrorValue] = useState({
    id: false,
    password: false,
  })

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  return (
    <View style={styles.container}>
    {isAuthenticating ? <LoadingOverlay /> : null}
      <Text style={{fontSize: 35, paddingBottom:15, fontFamily:'nexon-gothic-bold'}}>RE:POST</Text>
      <MainTextInput 
        placeholder={"ID"}
        setChange={(e) => {
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
        style={{width: wp('80%')}}
        isWrong={errorValue.id}
      />
      <MainTextInput
        placeholder={"PASSWORD"}
        setChange={(e) => {
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
        style={{width: wp('80%')}}
        secure={true}
        isWrong={errorValue.password}
      />
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
              try {
                const token = await authenticate(inputValue.id, inputValue.password)
                dispatch(redux.authenticate({'token': token}))
              } catch (error) {
                alert('해당되는 계정이 없습니다')
              }
              setIsAuthenticating(false)
            }
          // navigation.navigate('home')
        }}>
        <CustomText>
          로그인
        </CustomText>
      </MainButton>
      <View style={styles.signupContainer}>
        <Text style={styles.infoText}>
          <CustomText>암호를 잊어버리셨나요?</CustomText>
        </Text>
        <Pressable 
          onPress={() => {
            navigation.navigate('sign-up')
          }}>
          <Text style={styles.signupBtn}>
            <CustomText>회원가입</CustomText>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingBottom: 200,
    paddingHorizontal: 20,
    width: wp('100%'),
    display:'flex',
    alignItems:'center'
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
  infoText: {
    paddingRight:5
  },
  signupBtn: {
    color: '#206CFF'
  }
});