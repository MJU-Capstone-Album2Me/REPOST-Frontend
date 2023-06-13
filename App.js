import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/molecules/ToastConfig';
//import
import { useAssets } from 'expo-asset';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function App() {

  // 상태표시줄 포함 (android)
  const deviceWidth = Dimensions.get('screen').width
  // 상태표시줄 미포함 측정 (android)
  const deviceWindowWidth = Dimensions.get('window').width

  const [fontsLoaded] = useFonts({
    'nexon-gothic': require('./assets/fonts/NEXON_Lv2_Gothic.ttf'),
    'nexon-gothic-medium': require('./assets/fonts/NEXON_Lv2_Gothic_Medium.ttf'),
    // 'nexon-gothic-light': require('./assets/fonts/NEXON_Lv2_Gothic_Light.ttf'),
    'nexon-gothic-bold': require('./assets/fonts/NEXON_Lv2_Gothic_Bold.ttf'),
  })

  const [assetsLoaded] = useAssets([
    require('./assets/adaptive-icon.png'),
    require('./assets/back.png'),
    require('./assets/bell.png'),
    require('./assets/favicon.png'),
    require('./assets/home.png'),
    require('./assets/icon.png'),
    require('./assets/image.png'),
    require('./assets/multi-users.png'),
    require('./assets/next.png'),
    require('./assets/prev-icon.png'),
    require('./assets/reject.png'),
    require('./assets/splash.png'),
    require('./assets/user_default.png'),
    require('./assets/user.png'),
    require('./assets/logout.png'),
  ])

  if (!fontsLoaded || !assetsLoaded) {
    return <AppLoading />
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}
