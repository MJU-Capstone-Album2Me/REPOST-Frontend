import {View, ActivityIndicator, StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
}
export default LoadingOverlay

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: '0.3',
    zIndex:100
  }
})