import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    'nexon-gothic': require('./assets/fonts/NEXON_Lv2_Gothic.ttf'),
    // 'nexon-gothic-medium': require('./assets/fonts/NEXON_Lv2_Gothic_Medium.ttf'),
    // 'nexon-gothic-light': require('./assets/fonts/NEXON_Lv2_Gothic_Light.ttf'),
    // 'nexon-gothic-bold': require('./assets/fonts/NEXON_Lv2_Gothic_Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
