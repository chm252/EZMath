import React from 'react';
import {
Pressable,Text,
StyleSheet
} from 'react-native'
const HMbutton = (props) => {
    return (
        <Pressable
        onPress={props.onPressFunc}
        hitSlop = {{top: 10, bottom : 10, right: 10, left: 10}}
        style = {({p}) => [
          {backgroundColor: p ? 'red' : props.d},
          styles.button
        ]}>
          <Text style = {styles.text}>
            {props.title}
          </Text>
        </Pressable>
    )
}
const styles = StyleSheet.create ({
    text: {
        color: 'green',
        fontSize:30,
        fontStyle:'italic',
        margin: 10,
      },
      button:{
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor : 'orange',
        borderBottomWidth: 0.5,
        borderRadius: 50
      
      },
    })
export default HMbutton