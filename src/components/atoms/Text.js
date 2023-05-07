
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";

export const CustomText = ({ children, style }) => {
  return (
    <Text 
      style={style ? [style, styles.text] : styles.text}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nexon-gothic'
  },
})
