import { StyleSheet, Text, View, Button, Modal, Pressable, Alert } from 'react-native';
import { CustomText } from '../atoms/Text';
import Dialog, { DialogContent,DialogButton } from 'react-native-popup-dialog';
import { useState } from 'react';
import { SubButton } from '../atoms/Buttons';
import {launchCameraAsync, useCameraPermissions, PermissionStatus, useMediaLibraryPermissions, launchImageLibraryAsync} from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux';
import { pushImg, setProfileImg } from '../../store/reducers/imgs';
import { useRoute } from '@react-navigation/native';
import { patchProfile } from '../../util/auth';
import { selectProfileUrl } from '../../store/reducers/select';

export const CameraGalleryDialog = ({children, navigation, visible, setVisible}) => {
  const dispatch = useDispatch()
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [galleryPermissionInformation, requestGalleryPermission] = useMediaLibraryPermissions();

  
  const currRoute = useRoute().name;

  const cameraVerifyPermission = async () => {
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

  const galleryVerifyPermission = async () => {
    // 사용자 권한 요청을 아직 받지 않음을 의미
    if (galleryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestGalleryPermission();
      return permissionResponse.granted;
    }

    if (galleryPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        '권한 부족',
        '해당 기능을 사용하기 위해선 갤러리 접근 승인이 필요합니다'
      )
      return false;
    }

    return true;
  }
  

  const takeImageHandler = async () => {
    const hasPermission = await cameraVerifyPermission();

    if (!hasPermission) {
      return ;
    }

    const image = await launchCameraAsync({
      allowsEditing: true
    })
    console.log(image.assets[0], typeof(image.assets[0]));
    dispatch(pushImg({
      'img': image.assets[0].uri,
      'imgObject': image.assets[0]
    }))
    setVisible(false)
    if (currRoute!= 'image-upload') navigation.navigate('image-upload')
  }

  const getImageHandler = async () => {
    const hasPermission = await galleryVerifyPermission();

    if (!hasPermission) {
      return ;
    }

    const image = await launchImageLibraryAsync()
    console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri)
    dispatch(pushImg({
      'img': image.assets[0].uri,
      'imgObject': image.assets[0]
    }))
    setVisible(false)
    if (currRoute!= 'image-upload') navigation.navigate('image-upload')
  }


  return (
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
          onPress={ () => {
            getImageHandler()
          }}
          style={{borderRadius: 0}}>
            갤러리
        </SubButton>
      </Dialog>
  )
}


export const ProfileCameraGalleryDialog = ({children, navigation, visible, setVisible, setProfileUrl}) => {
  const dispatch = useDispatch()
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [galleryPermissionInformation, requestGalleryPermission] = useMediaLibraryPermissions();
  const token = useSelector((state) => state.auth.token)
  
  const currRoute = useRoute().name;

  const cameraVerifyPermission = async () => {
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

  const galleryVerifyPermission = async () => {
    // 사용자 권한 요청을 아직 받지 않음을 의미
    if (galleryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestGalleryPermission();
      return permissionResponse.granted;
    }

    if (galleryPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        '권한 부족',
        '해당 기능을 사용하기 위해선 갤러리 접근 승인이 필요합니다'
      )
      return false;
    }

    return true;
  }
  

  const takeImageHandler = async () => {
    const hasPermission = await cameraVerifyPermission();

    if (!hasPermission) {
      return ;
    }

    const image = await launchCameraAsync({
      allowsEditing: true
    })
    console.log(image.assets[0], typeof(image.assets[0]));
    const response = await patchProfile(token, image.assets[0])
    dispatch(selectProfileUrl({profileUrl: response.data.profileImage}))
    setProfileUrl(response.data.profileImage)
    setVisible(false)
  }

  const getImageHandler = async () => {
    const hasPermission = await galleryVerifyPermission();

    if (!hasPermission) {
      return ;
    }

    const image = await launchImageLibraryAsync()
    setPickedImage(image.assets[0].uri)
    const response = await patchProfile(token, image.assets[0])
    dispatch(selectProfileUrl({profileUrl: response.data.profileImage}))
    setProfileUrl(response.data.profileImage)
    setVisible(false)
  }


  return (
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
          onPress={ () => {
            getImageHandler()
          }}
          style={{borderRadius: 0}}>
            갤러리
        </SubButton>
      </Dialog>
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