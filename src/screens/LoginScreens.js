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
      <Title>로그인</Title>
      <MainTextInput 
        placeholder={"아이디"}
      />
      <MainTextInput></MainTextInput>
      <MainButton 
        onPress={() => {
          console.log('click login');
          navigation.navigate('sign-up')
        }}>
          로그인
      </MainButton>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingBottom: 100
  },  
});