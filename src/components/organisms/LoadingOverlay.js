import {View, ActivityIndicator, StyleSheet, Text} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from '../atoms/Text';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
}
export default LoadingOverlay

export const ModelLoadingOverlay = () => {
  return (
    <View style={styles.newContainer}>
      <Text style={{fontFamily:'nexon-gothic-bold', fontSize: 30, paddingBottom:10}}>고해상도 복원중입니다</Text>
      <CustomText >잠시만 기다려주세요</CustomText>
      <ActivityIndicator size="large" color="#111111" style={{marginTop:5, marginBottom:30}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // opacity: '0.3',
    zIndex:100
  },
  newContainer: {
    position:'absolute',
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    top:200,
    left: wp('10%'),
    backgroundColor: 'rgb(241, 251, 255)',
    // opacity: '0.3',
    // borderRadius:20,
    zIndex:100
  }
})