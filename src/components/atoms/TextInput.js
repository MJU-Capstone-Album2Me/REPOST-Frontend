import { View, Text, Pressable, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const MainTextInput = (props) => {
  return (
    <TextInput 
      style={[styles.textInputContainer,  props.isWrong && styles.wrong, props.style]}
      placeholder={props.placeholder}
      onChangeText={(e)=>{
        props.setChange&&props.setChange(e)
      }}
      secureTextEntry={props.secure}
      value={props.value}
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
    height: 45
  },
  textInputText: {
    // color: '#ffffff',
    textAlign: 'center'
  },
  wrong: {
    borderColor:'red',
  }
})