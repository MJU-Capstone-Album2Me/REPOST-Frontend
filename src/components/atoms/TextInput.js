import { View, Text, Pressable, StyleSheet, TouchableHighlight, TextInput } from "react-native";

export const MainTextInput = (props) => {
  return (
    <TextInput 
      style={styles.textInputContainer}
      placeholder={props.placeholder}
    >
    </TextInput>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginVertical: 3,
    marginHorizontal: 17,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textInputText: {
    // color: '#ffffff',
    textAlign: 'center'
  },
  focused: {
  }
})