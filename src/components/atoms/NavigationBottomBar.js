
import { View, Text, Pressable, StyleSheet, TouchableHighlight, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from "./Text";
import { CameraGalleryDialog } from "../molecules/PopupDialog";
import { useState } from "react";

const TITLE = {
  'home': '홈',
  'gallery': '갤러리',
  'camera': '카메라',
  'members': '멤버',
  'mypage': '설정'
}
const IMG = {
  'home': require('../../../assets/home.png'),
  'gallery': require('../../../assets/image.png'),
  'camera': require('../../../assets/home.png'),
  'members': require('../../../assets/multi-users.png'),
  'mypage': require('../../../assets/user.png'),
}

export const NavigationBottomBar = ({state, descriptors, navigation}) => {
  const [cameraDialog, setCameraDialog] = useState(false) 
  return (
      <View style={styles.navigationOuter}>
        <View style={styles.navigationInner}>
        {state && state.routes.map((route , index) => {
          const isFocused = state.index == index;

          const onPress = () => {
            if (route.name == 'camera') setCameraDialog(true)
            else {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
  
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          };
  
          if (route.name == 'camera') {
            return (
            <View style={styles.cameraIcon}>
              <Pressable onPress={()=>{setCameraDialog(true)}}>
                <View style={{
                  borderColor:'#4d4d4d',
                  borderWidth:1,
                  width: 70,
                  height: 70,
                  backgroundColor:'white',
                  borderRadius: 40,
                  marginBottom: 40}}></View>
              </Pressable>
            </View>
        )}
          return (
            <Pressable
              onPress = {onPress}
              style = {styles.icon}
              key = {index} 
              >
              <Image style={{width:30, height:30}} source={IMG[route.name]}/>
              <CustomText style = {{color: isFocused?"#0080FE": "#111111" }}>{TITLE[route.name]}</CustomText>
            </Pressable>
          );
        })}
          {/* <Pressable 
            onPress={() => {navigation.navigate('album-list')}}
            style={styles.icon}>
            <Image style={{width:30, height:30}} source={require('../../../assets/home.png')}/>
            <CustomText>홈</CustomText>
          </Pressable>
          <Pressable 
            onPress={()=> {navigation.navigate('gallery')}}
            style={styles.icon}>
            <Image 
              style={{width:30 , height:30 }} source={require('../../../assets/image.png')}/>
            <CustomText>갤러리</CustomText>
          </Pressable>
          <View style={styles.cameraIcon}>
            <Pressable onPress={()=>{setCameraDialog(true)}}>
              <View style={{
                borderColor:'#4d4d4d',
                borderWidth:1,
                width: 70,
                height: 70,
                backgroundColor:'white',
                borderRadius: 40,
                marginBottom: 40}}></View>
            </Pressable>
          </View>
          <Pressable 
            onPress={()=> navigation.navigate('member-list')}
            style={styles.icon}>
            <Image 
              style={{width:30 , height:30 }} source={require('../../../assets/multi-users.png')}/>
            <CustomText>멤버</CustomText>
          </Pressable>
          <Pressable 
            onPress={()=> navigation.navigate('mypage')}
            style={styles.icon}>
            <Image 
              style={{width:30 , height:30 }} source={require('../../../assets/user.png')}/>
            <CustomText>설정</CustomText>
          </Pressable> */}
        </View>
        <CameraGalleryDialog navigation={navigation} visible={cameraDialog} setVisible={setCameraDialog}/>
      </View>
  )
}

// const TabBar = ({ state, descriptors, navigation}: any) =>{
//   return (
//     <View style={styles.mainContainer}>
//       {state.routes.map((route: any , index: number) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <View key = {index} style = {[styles.mainItemContainer, {borderRightWidth: label=="notes"? 3:0}]}>
//             <Pressable
//               onPress = {onPress}
//               style = {{backgroundColor: isFocused?"#030D16": "#182028", borderRadius: 20, }}>
//               <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
//                 <NavigationIcon route={label} isFocused={isFocused}/>
//               </View>
//             </Pressable>
//           </View>
//         );
//       })}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  navigationOuter: {
    bottom: 0,
    margin: 0,
    width: wp('100%'),
    height: 70,
    backgroundColor:'white',
    display:'flex'
    // borderBottomColor: '#000000',
    // borderBottomWidth: 1
  },
  navigationInner: {
    flex:1,
    // backgroundColor:'red',
    // marginHorizontal: 25,
    borderTopColor: '#4d4d4d',
    borderTopWidth: 1,
    display:"flex",
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 8,
  },
  navigationText: {
    fontSize:28,
    fontWeight:800
  },
  cameraIcon: {
    flex:1,
    display:'flex',
    alignItems:'center'
  },
  icon: {
    flex: 1,
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
  }
})
