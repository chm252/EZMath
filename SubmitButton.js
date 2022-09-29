import {
    View,
    Text,
    StyleSheet,
    Pressable,
  } from 'react-native';

  function SubmitButton(props) {
    return (
        <Pressable onPress={props.function}
        style={({ pressed }) => ({ backgroundColor: pressed ? '#a1f0e8' : '#03ad96' })}>
        <View style = {styles.button}>
        <Text style = {styles.text}>{props.message}</Text>
        </View>
      </Pressable>
    ) 
  }
  const styles = StyleSheet.create({
    button: {
      width: 300,
      height: 130,
      borderWidth: 5,
      borderColor: '#123d2d',
      borderRadius: 15,
      textAlign: 'auto',
      fontSize: 20,
    },

    text: {
      fontSize: 85,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#144a36',
    },
}
)
  export default SubmitButton;