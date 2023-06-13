import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { AlbumList } from '../screens/AlbumList';
import { PostList } from '../screens/PostList';
import { StatusBar } from 'expo-status-bar';
import { ImageUploadScreen } from '../screens/ImageUploadScreen';
import { CustomText } from '../components/atoms/Text';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { RoomList } from '../screens/RoomList';
import { AlarmList } from '../screens/AlarmList';
import { PostWriteScreen } from '../screens/PostWriteScreen';
import { Gallery } from '../screens/Gallery';
import { HomeTabs } from './tabNavigation';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='login'
      screenOptions={{
        // contentStyle: {borderBottomColor: '#111111', borderBottomWidth: 2, borderStyle: 'solid', backgroundColor: '#111111'},
        headerShown: false
      }}>
      <Stack.Screen 
        name="login" 
        component={LoginScreen} 
        options={{
          title: '로그인'
        }}
      />
      <Stack.Screen 
        name="sign-up" 
        component={SignUpScreen} 
        options={{
          title: '회원가입'
        }}
      />
    </Stack.Navigator>
  )
}


const AuthenticatedStack = () => {
  return (
      <Stack.Navigator 
        initialRouteName='room-list'
        screenOptions={{
          title: '앨범',
          // contentStyle: {borderBottomColor: '#111111', borderBottomWidth: 2, borderStyle: 'solid', backgroundColor: '#111111'},
          headerShown: false
        }}
      >
        {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
        <Stack.Screen 
          name="home" 
          component={HomeTabs} 
          options={{
            title: '홈'
          }}
        />
        <Stack.Screen 
          name="camera" 
          component={CameraScreen} 
          options={{
            title: '카메라'
          }}
        />
        <Stack.Screen 
          name="album-list" 
          component={AlbumList} 
          options={{
            title: '앨범',
            contentStyle: {borderBottomColor: '#111111', borderBottomWidth: 2, borderStyle: 'solid'}
          }}
          initialParams={{id:0}}
        />
        <Stack.Screen 
          name="post-list" 
          component={PostList} 
          options={{
            title: '포스트'
          }}
        />
        <Stack.Screen 
          name="gallery" 
          component={Gallery} 
          options={{
            title: '갤러리'
          }}
        />
        <Stack.Screen
          name='image-upload'
          component={ImageUploadScreen}
          options={{ 
            title: '이미지 업로드'  
          }} 
          />
        <Stack.Screen
          name='post-detail'
          component={PostDetailScreen}
          options={{
            title: '포스트'
          }}
        />
        <Stack.Screen
          name='room-list'
          component={RoomList}
          options={{
            title:'room-list'
          }}
        />
        <Stack.Screen
          name='alarm-list'
          component={AlarmList}
          options={{
            title:'alarm-list'
          }}
        />
        <Stack.Screen
          name='post-write'
          component={PostWriteScreen}
          options={{
            title:'post-write'
          }}
        />
      </Stack.Navigator>
  );
}

import { authenticate } from '../store/reducers/auth';
import LoadingOverlay from '../components/organisms/LoadingOverlay';
import { useState } from 'react';

const RootNavigation = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isTryingLogin, setIsTryingLogin] = useState(true)

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        dispatch(authenticate(storedToken))
      }

      setIsTryingLogin(false)
    }
    fetchToken();
  }, [])

  if (isTryingLogin) return <LoadingOverlay />

  return (
    <>
      {isAuthenticated && <AuthenticatedStack/>}
      {!isAuthenticated && <AuthStack />}
    </>
  )
}

export default RootNavigation;