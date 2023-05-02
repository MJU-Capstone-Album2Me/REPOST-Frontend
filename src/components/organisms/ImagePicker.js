import { Alert, Button, Text, View } from "react-native"
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'

export const ImagePicker = () => {
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

    console.log(image)
  }

  return <View>
    <Text>hi</Text>
    <Button
      title="take image"
      onPress={takeImageHandler}
    />
  </View>
}