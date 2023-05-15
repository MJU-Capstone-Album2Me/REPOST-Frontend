import { StyleSheet, Text, View, Button, Modal, Pressable, Alert } from 'react-native';
import { CustomText } from '../atoms/Text';
import Dialog, { DialogContent,DialogButton } from 'react-native-popup-dialog';
import { useState } from 'react';
import { SubButton } from '../atoms/Buttons';
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'

export const CameraGalleryDialog = ({children, navigation}) => {
  const [visible, setVisible] = useState(false)
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const verifyPermission = async () => {
    // 사용자 권한 요청을 아직 받지 않음을 의미
    
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        '권한 부족',
        '해당 기능을 사용하기 위해선 카메라 접근 승인이 필요합니다'
      )
      return false;
    }

    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return ;
    }

    const image = await launchCameraAsync()
    console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      <Button
        title="modalContent"
        onPress={() => {
          setVisible(true)
        }}
      />
      <Dialog
        visible={visible}
        onTouchOutside={() => {
          setVisible(false)
        }}
        // height={120}
        width={180}
        dialogStyle={{ justifyContent:'center',  display:'flex'}}
      >
        <SubButton 
          onPress={ () => {
            takeImageHandler()
          }}
          style={{borderRadius: 0}}>
            카메라
        </SubButton>
        <SubButton 
          onPress={ () => {navigation.navigate('login')} }
          style={{borderRadius: 0}}>
            갤러리
        </SubButton>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});