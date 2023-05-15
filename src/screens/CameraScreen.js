import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ImagePicker } from '../components/organisms/ImagePicker';
import { CustomText } from '../components/atoms/Text';
import { CameraGalleryDialog } from '../components/molecules/PopupDialog';
import { useState } from 'react';
import { SubButton } from '../components/atoms/Buttons';

export const CameraScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CameraGalleryDialog navigation={navigation}>
      </CameraGalleryDialog>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    padding:20
  }
});
