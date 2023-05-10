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

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <>
      <StatusBar />
      <Stack.Navigator 
        initialRouteName='album-list'
        screenOptions={{
          title: '앨범',
          contentStyle: {borderBottomColor: '#111111', borderBottomWidth: 2, borderStyle: 'solid', backgroundColor: '#111111'}
        }}
      >
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
      </Stack.Navigator>
    </>
  );
}

export default RootNavigation;