import { View, Text, StyleSheet } from "react-native";

export const Title = ({children}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 900,
    marginBottom: 15
  }
})