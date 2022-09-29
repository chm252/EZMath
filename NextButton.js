import {
    View,
    Text,
    StyleSheet,
    Pressable,
  } from 'react-native';

  function NextButton(props) {
    return (
      <View style = {styles.button}>
        <Pressable onPress={props.function}
        style={({ pressed }) => ({ backgroundColor: pressed ? '#00fbff' : '#0077ff' })}>
        <Text style = {styles.text}>{props.message}</Text>
      </Pressable>
      </View>
    ) 
  }
  const styles = StyleSheet.create({
    button: {
      width: 350,
      height: 70,
      borderWidth: 5,
      borderColor: '#123d2d',
      borderRadius: 20,
      textAlign: 'center',
      fontSize: 20,
    },

    text: {
      fontSize: 50,
      textAlign: 'auto',
      color: '#cbf4f5',
    },
}
)
  export default NextButton;