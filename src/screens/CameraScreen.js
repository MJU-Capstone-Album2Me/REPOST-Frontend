import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ImagePicker } from '../components/organisms/ImagePicker';

export const CameraScreen = () => {
  return (
    <View style={styles.container}>
        <ImagePicker />
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
