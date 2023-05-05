import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainButton } from '../components/atoms/Button';
import { MainTextInput } from '../components/atoms/TextInput';
import { Title } from '../components/atoms/Title';
import { CustomText } from '../components/atoms/Text';

export const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {/* <MainButton
        // title="Go to signup"
        // style={buttons.container}
        onPress={() => navigation.navigate('sign-up')}
      >Login</MainButton> */}
      <MainTextInput 
        placeholder={"ID"}
      />
      <MainTextInput
        placeholder={"PASSWORD"}
      />
      <MainButton 
        onPress={() => {
          console.log('click login');
          navigation.navigate('camera')
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