import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { AlbumList } from '../screens/AlbumList';
import { Gallery } from '../screens/Gallery';
import { MyPage } from '../screens/MyPage';

import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName={"home"} screenOptions={{headerShown:false}} tabBar={props => <NavigationBottomBar {...props} />}>
      <Tab.Screen name="home" children={()=><AlbumList title="홈"/>}  />
      <Tab.Screen name="gallery" children={()=><Gallery title="갤러리"/>} />
      <Tab.Screen name="camera" children={()=><AlbumList title="카메라"/>} />
      <Tab.Screen name="members" children={()=><AlbumList title="멤버"/>} />
      <Tab.Screen name="mypage" children={()=><MyPage title="설정"/>} />
    </Tab.Navigator>
  );
}
