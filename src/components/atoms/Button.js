import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";

export const MainButton = ({ children, onPress }) => {
  const pressHandler = () => {
    console.log('hello');
  }
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
          <Text style={styles.buttonText}>{children}</Text>
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
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 700
  },
  pressed: {
    opacity: 0.75
  }
})