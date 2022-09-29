import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
  } from 'react-native';
const OpButton = (props) => {
    return (
        <Pressable onPress={props.function}
            style={({ pressed }) => ({ backgroundColor: pressed ? '#aeed0e' : props.color })}>
            <View style = {styles.button} >
                <Text style = {styles.text}> {props.text} </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
      button: {
        width: 185,
        height: 200,
        borderWidth: 10,
        borderColor: '#1e2b25',
        borderRadius: 10,
        textAlign: 'auto',
        fontSize: 20,
      },
      text: {
        fontSize: 160,
        fontWeight: 'bold',
        textAlign: 'auto',
        color: '#cef5e2',
      },
}
)
export default OpButton;