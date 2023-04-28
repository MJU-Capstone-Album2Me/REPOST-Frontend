import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MainButton } from '../components/atoms/Button';
import { MainTextInput } from '../components/atoms/TextInput';
import { Title } from '../components/atoms/Title';

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
          navigation.navigate('sign-up')
        }}>
          로그인
      </MainButton>
      <View style={styles.signupContainer}>
        <Text style={styles.infoText}>암호를 잊어버리셨나요?</Text>
        <Text style={styles.signupBtn}>회원가입</Text>
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