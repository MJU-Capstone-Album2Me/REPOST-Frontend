
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";

export const CustomText = ({ children }) => {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nexon-gothic'
  },
})
