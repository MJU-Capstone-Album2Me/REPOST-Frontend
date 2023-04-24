import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreens';
import { SignUpScreen } from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="sign-up" component={SignUpScreen} />
      </Stack.Navigator>
  );
}

export default RootNavigation;