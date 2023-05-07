import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { AlbumList } from '../screens/AlbumList';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='album-list'>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="sign-up" component={SignUpScreen} />
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="album-list" component={AlbumList} />
      </Stack.Navigator>
  );
}

export default RootNavigation;