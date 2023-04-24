import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>sign up</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    padding:20
  }
});
