import { Alert, Button, Text, View, Image, StyleSheet } from "react-native"
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'
import { useState } from "react";

export const ImagePicker = () => {
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

    const image = await launchCameraAsync({
      allowsEditing:true
    })
    console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Text>hi</Text>
      <Button title="take image" onPress={takeImageHandler} />
    </View>
    )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100
  }
})

export const imgPicker = (props) => {

}