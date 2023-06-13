import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { AlbumList } from '../screens/AlbumList';
import { Gallery } from '../screens/Gallery';
import { MyPage } from '../screens/MyPage';
import { MemberList } from '../screens/Member';

import { NavigationBottomBar } from '../components/atoms/NavigationBottomBar';

const Tab = createBottomTabNavigator();

export const HomeTabs = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName={"home"} screenOptions={{headerShown:false}} tabBar={props => <NavigationBottomBar {...props} />}>
      <Tab.Screen name="home" children={()=><AlbumList navigation={navigation} title="홈"/>}  />
      <Tab.Screen name="gallery" children={()=><Gallery navigation={navigation} title="갤러리"/>} />
      <Tab.Screen name="camera" children={()=><AlbumList navigation={navigation} title="카메라"/>} />
      <Tab.Screen name="members" children={()=><MemberList navigation={navigation} title="멤버"/>} />
      <Tab.Screen name="mypage" children={()=><MyPage navigation={navigation} title="설정"/>} />
    </Tab.Navigator>
  );
}
