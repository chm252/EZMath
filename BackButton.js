import {
    StyleSheet,
    Pressable,
    Image,
  } from 'react-native';


function BackButton(props) {
    
    return(
    <Pressable onPress = {props.function}
    style={({ pressed }) => ({ borderColor: pressed ? '#aeed0e' : 'black'})}> 
    <Image style = {[styles.back, {marginTop : props.top}]} source = {require('./assets/back.jpg')}/>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    back: {
        width: 50,
        height: 50,
        marginLeft : -150,
        resizeMode :'contain',
        borderColor : 'green',
        borderWidth : 3
      },
    }
)
export default BackButton;