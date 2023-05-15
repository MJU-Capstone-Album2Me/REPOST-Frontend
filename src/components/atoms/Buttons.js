import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { CustomText } from "./Text";

export const MainButton = ({ children, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable 
        style={({pressed}) => 
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
      }
        onPress={onPress}
        android_ripple="#aaaa21"
      >
          <CustomText style={styles.buttonText}>{children}</CustomText>
      </Pressable>
    </View>
  )
}

export const SubButton = ({ children, onPress, style }) => {
  return (
    <View style={[styles.subButtonOuterContainer, style]}>
      <Pressable 
        style={({pressed}) => 
          pressed
            ? [styles.subButtonInnerContainer, styles.subPressed]
            : styles.subButtonInnerContainer
      }
        onPress={onPress}
        android_ripple="#aaaa21"
      >
          <CustomText style={styles.subButtonText}>{children}</CustomText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    margin: 17,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: '#111111',
    paddingVertical: 13,
    paddingHorizontal: 16,
    elevation:2 ,
  },
  subButtonOuterContainer: {
    // flex:1,
    borderColor: '#C3BFBF',
    borderRadius: 10,
    borderWidth: 1,
    // margin: 17,
    overflow: "hidden",
  },
  subButtonInnerContainer: {
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 700
  },
  subButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 700,
    // fontSize: 18,
  },
  pressed: {
    opacity: 0.75
  },
  subPressed: {
    backgroundColor: '#eeeeee'
  }
})