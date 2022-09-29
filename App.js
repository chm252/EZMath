import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import OpButton from './OpButton';
import SubmitButton from './SubmitButton';
import NextButton from './NextButton';
import BackButton from './BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
  Modal,
  ImageBackground,
} from 'react-native';
const Stack = createStackNavigator();

function Home({ navigation }) {
  const onPressHandler = () => {
    if (name.length > 0) {
      navigation.navigate('Num', {name: name})
    } else {
      Alert.alert('Warning', 'Please kindly enter your name.')
    }
  }
  const [name, setName] = useState('')
  return (
    <KeyboardAwareScrollView contentContainerStyle = {{flexGrow:1}}>
    <View style={styles.body}>
      <Image style={styles.image} source={require('./assets/hippo.jpg')} />
      <Text style={styles.text}> New Player: </Text>
      <TextInput
        style={styles.input}
        placeholder='e.g. Jonas Wee'
        onChangeText={(value) => setName(value)}
      />
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#7aeb34' : '#ab346a' },
          styles.button
        ]}>
        <Text style={styles.text}> NEXT </Text>
      </Pressable>
    </View>
    </KeyboardAwareScrollView>

  )
}
function Num({navigation, route}) {
  const [num, setNum] = useState(null)
  const onPressHandler = () => {
    if (num == 0 || num == null) {
      Alert.alert('Lazy!', 'You cannot do zero question!')
    }
    else if (num > 50) {
      Alert.alert('Keep to within 50', 'Exceeded maximum number of questions!')
    }
    else if (num > 0 && num <= 50) {
      navigation.navigate("ChooseOperator", {num : num, name: route.params.name})
    }
    else {
      Alert.alert('Invalid input!', 'Type a number between 0 and 51!')
    }
  }
  return (
  <KeyboardAwareScrollView contentContainerStyle = {{flexGrow:1}}>
  <View style = {styles.body}>
    <BackButton function = {() => navigation.goBack()} top = {-150} />
    <Image style={{height : 200, width : 252}} source={require('./assets/brain.jpg')} />
    <Text style = {styles.text}>
      Input number of questions (up to 50)
    </Text>
    <TextInput
        style={styles.input}
        placeholder='Number of Questions'
        onChangeText={(value) => setNum(value)}
        keyboardType = 'numeric'
      />  
    <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#7aeb34' : '#ab346a' },
          styles.button
        ]}>
        <Text style={styles.text}> NEXT </Text>
      </Pressable>
    </View>
    </KeyboardAwareScrollView>
  )
}

function ChooseOperator({ navigation, route }) {
  const {num} = route.params
  const plusFunc = () => {
    navigation.navigate("PlusQuestions", {num: num, name: route.params.name});
  }
  const minusFunc = () => {
    navigation.navigate("MinusQuestions", {num : num, name: route.params.name})
  }
  const multiplyFunc = () => {
    navigation.navigate("MultiplyQuestions", {num : num, name: route.params.name});
  }
  const divideFunc = () => {
    navigation.navigate("DivideQuestions", {num : num, name: route.params.name});
  }

  return (
    <>
      <View style={styles.burden} />
      <Text style={[styles.title, {marginTop:100}]}>Take your Pick!</Text>
      <View style={styles.operatorPage}>
        <View style={styles.horizontal}>
          <OpButton function={plusFunc}
              color = '#7d0c23'
              text = '+'/>
          <OpButton function={minusFunc}
              color = '#0a3091'
              text = '-'/>
        </View>
        <View style={styles.horizontal}>
        <OpButton function={multiplyFunc}
              color = '#0a5733'
              text = '×'/>
          <OpButton function={divideFunc}
              color = '#440980'
              text = '÷'/>
        </View>
      </View>
    </>
  )
}

function PlusQuestions({ navigation, route }) {
  const {num} = route.params
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [x1, setX1] = useState(Math.floor((Math.random() * 100) + 1))
  const [x2, setX2] = useState(Math.floor((Math.random() * 100) + 1))
  const [attempt, setAttempt] = useState(null)
  const nextQn = () => {
    setIsSubmitted(false)
    setX1(Math.floor((Math.random() * 100) + 1))
    setX2(Math.floor((Math.random() * 100) + 1))
    setAttempt(null)
  }
  const done = () => {
    setIsSubmitted(false)
    navigation.navigate("Results", {score : score, num : num, name: route.params.name}) //chm
  }

  const submit = () => {
    if (attempt == null) {
      Alert.alert('No Input', 'Please key in an answer')
    } else {
      this.textInput.clear()
      setIsSubmitted(true)
      setCount(count + 1)
      if (x1 + x2 == attempt) {
        setScore(score + 1)
      }
    }

    //here to update score ie if attempt == ans
  }
  return (
    <View style={styles.background}>
      <ImageBackground 
      style = {styles.body}
      source = {require('./assets/background.jpg')}
      >
      <BackButton top = {-252} function = {() => Alert.alert('Warning!', 'Are you sure you want to leave now?',
      [ {text: 'Stay here', onPress : () => console.log('stay')}, {text: 'Leave Now', onPress : () => navigation.goBack()}])}/>
      <Modal
        visible={isSubmitted}>
        {
          x1 + x2 == attempt ?
            <>
              <Image source={require('./assets/kakashi.jpg')} 
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.correct}>Correct!</Text>
            </>

            :
            <>
              <Image source={require('./assets/terence.jpg')} 
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.wrong}
              >Wrong</Text>
              <Text style = {styles.text}> {x1} + {x2} = {x1 + x2}</Text>
            </>
        }
        {count < num
          ?
          <NextButton function = {nextQn} message = '  Next Question '/>
          :
          <NextButton function = {done} message = '    View Score!'/>
      }
      </Modal>
      <Text style={styles.text}>
        {x1} + {x2} =
      </Text>
    <TextInput
        style={styles.input}
        placeholder='Type your answer here!'
        onChangeText={(value) => setAttempt(value)}
        keyboardType='numeric'
        ref={input => { this.textInput = input }}
      />
      <SubmitButton function = {submit} message = 'Submit'/>
      </ImageBackground>
      </View>
  )
}

function MinusQuestions({ navigation, route }) {
  const num = route.params.num
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [x1, setX1] = useState(Math.floor((Math.random() * 100) + 1))
  const [x2, setX2] = useState(Math.floor((Math.random() * 100) + 1))
  const [attempt, setAttempt] = useState(null)
  const nextQn = () => {
    setIsSubmitted(false)
    setX1(Math.floor((Math.random() * 100) + 1))
    setX2(Math.floor((Math.random() * 100) + 1))
    setAttempt(null)
  }
  const done = () => {
    setIsSubmitted(false)
    navigation.navigate("Results", {score : score, num: num, name: route.params.name})
  }

  const submit = () => {
    if (attempt == null) {
      Alert.alert('No Input', 'Please key in an answer')
    } else {
      this.textInput.clear()
      setIsSubmitted(true)
      setCount(count + 1)
      if (Math.max(x1, x2) - Math.min(x1, x2) == attempt) {
        setScore(score + 1)
      }
    }
    //here to update score ie if attempt == ans
  }
  return (
    <View style={styles.background}>
      <ImageBackground 
      style = {styles.body}
      source = {require('./assets/background.jpg')}
      >
      <BackButton top = {-252} function = {() => Alert.alert('Warning!', 'Are you sure you want to leave now?',
      [ {text: 'Stay here', onPress : () => console.log('stay')}, {text: 'Leave Now', onPress : () => navigation.goBack()}])}/>
      <Modal
        visible={isSubmitted}>
        {
          Math.max(x1, x2) - Math.min(x1, x2) == attempt ?
            <>
              <Image source={require('./assets/kakashi.jpg')} 
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.correct}>Correct!</Text>
            </>

            :
            <>
              <Image source={require('./assets/terence.jpg')} 
                  style={{ width: 375, height: 450 }}/>
              <Text style={styles.wrong}>Wrong</Text>
              <Text style = {styles.text}> {Math.max(x1, x2)} - {Math.min(x1, x2)} = {Math.max(x1, x2) - Math.min(x1, x2)}</Text>
            </>
        }
        {count < num //changeable
          ?
          <NextButton function = {nextQn} message = '  Next Question '/>
          :
          <NextButton function = {done} message = '    View Score!'/>
      }
      </Modal>
      <Text style={styles.text}>
        {Math.max(x1, x2)} - {Math.min(x1, x2)} =
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Type your answer here!'
        onChangeText={(value) => setAttempt(value)}
        keyboardType='numeric'
        ref={input => { this.textInput = input }}
      />
      <SubmitButton function = {submit} message = 'Submit'/>
      </ImageBackground>
      </View>
  )
}

function MultiplyQuestions({ navigation, route }) {
  const num = route.params.num
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [x1, setX1] = useState(Math.floor((Math.random() * 12) + 1))
  const [x2, setX2] = useState(Math.floor((Math.random() * 12) + 1))
  const [x3, setX3] = useState(Math.floor((Math.random() * 10) + 1))
  const [attempt, setAttempt] = useState(null)
  const nextQn = () => {
    setIsSubmitted(false)
    setX1(Math.floor((Math.random() * 12) + 1))
    setX2(Math.floor((Math.random() * 12) + 1))
    setX3(Math.floor((Math.random() * 10) + 1))
    setAttempt(null)
  }
  const done = () => {
    setIsSubmitted(false)
    navigation.navigate("Results", {score : score, num : num, name: route.params.name}) 
  }

  const submit = () => {
    if (attempt == null) {
      Alert.alert('No Input', 'Please key in an answer')
    } else {
      this.textInput.clear()
      setIsSubmitted(true)
      setCount(count + 1)
      if (x1 * x2 == attempt) {
        setScore(score + 1)
      }
    }
    //here to update score ie if attempt == ans
  }
  return (
    <View style={styles.background}>
      <ImageBackground 
      style = {styles.body}
      source = {require('./assets/background.jpg')}
      >
      <BackButton top = {-252} function = {() => Alert.alert('Warning!', 'Are you sure you want to leave now?',
      [ {text: 'Stay here', onPress : () => console.log('stay')}, {text: 'Leave Now', onPress : () => navigation.goBack()}])}/>      
      <Modal
        visible={isSubmitted}>
        {
          x1 * x2 == attempt ?
            <>
              <Image source={require('./assets/kakashi.jpg')} 
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.correct}>Correct!</Text>
            </>

            :
            <>
              <Image source={require('./assets/terence.jpg')} 
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.wrong}>Wrong</Text>
              <Text style = {styles.text}> {x1} × {x2} = {x1 * x2}</Text>
            </>
        }
        {count < num
          ?
          <NextButton function = {nextQn} message = '  Next Question '/>
          :
          <NextButton function = {done} message = '    View Score!'/>
      }
      </Modal>
      {x3%2 == 0 ?
      <Text style={styles.text}>
        {x1} × {x2} =
      </Text>
      :
      <Text style={styles.text}>
        {x2} × {x1} =
      </Text>
    }
      <TextInput
        style={styles.input}
        placeholder='Type your answer here!'
        onChangeText={(value) => setAttempt(value)}
        keyboardType='numeric'
        ref={input => { this.textInput = input }}
      />
      <SubmitButton function = {submit} message = 'Submit'/>
      </ImageBackground>
      </View>
  )

}function DivideQuestions({ navigation , route }) {
  const num = route.params.num
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [x1, setX1] = useState(Math.floor((Math.random() * 12) + 1))
  const [x2, setX2] = useState(Math.floor((Math.random() * 12) + 1))
  const [attempt, setAttempt] = useState(null)
  const nextQn = () => {
    setIsSubmitted(false)
    setX1(Math.floor((Math.random() * 12) + 1))
    setX2(Math.floor((Math.random() * 12) + 1))
    setAttempt(null)
  }
  const done = () => {
    setIsSubmitted(false)
    navigation.navigate("Results", 
    {score : score, 
     num : num,
     name: route.params.name}) 
  }

  const submit = () => {
    if (attempt == null) {
      Alert.alert('No Input', 'Please key in an answer')
    } else {
      this.textInput.clear()
      setIsSubmitted(true)
      setCount(count + 1)
      if (x1 == attempt) {
        setScore(score + 1)
      }
    }
  }
  return (
    <View style={styles.background}>
      <ImageBackground 
      style = {styles.body}
      source = {require('./assets/background.jpg')}
      >
      <BackButton top = {-252} function = {() => Alert.alert('Warning!', 'Are you sure you want to leave now?',
      [ {text: 'Stay here', onPress : () => console.log('stay')}, {text: 'Leave Now', onPress : () => navigation.goBack()}])}/>
      <Modal
        visible={isSubmitted}>
        {
          x1 == attempt ?
            <>
              <Image source={require('./assets/kakashi.jpg')}
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.correct}>Correct!</Text>
            </>

            :
            <>
              <Image source={require('./assets/terence.jpg')}
                    style={{ width: 375, height: 450 }}/>
              <Text style={styles.wrong}>Wrong</Text>
              <Text style = {styles.text}> {x1*x2} ÷ {x2} = {x1}</Text>
            </>
        }
        {count < num
          ?
          <NextButton function = {nextQn} message = '  Next Question '/>
          :
          <NextButton function = {done} message = '    View Score!'/>
      }
      </Modal>

      <Text style={styles.text}>
        {x1*x2} ÷ {x2} =
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Type your answer here!'
        onChangeText={(value) => setAttempt(value)}
        keyboardType='numeric'
        ref={input => { this.textInput = input }}
      />
      <SubmitButton function = {submit} message = 'Submit'/>
      </ImageBackground>
      </View>
  )
}

function Results({ navigation, route}) {
  const onPressHome = () => {
    navigation.navigate('Home')
  }
  const onPressAgain = () => {
    navigation.navigate('Num', {num: route.params.name})
  }
  return (
    <View style={styles.body}>
      <Text style = {styles.text}> {route.params.name} </Text>
      <Text style={styles.text}> Your score: {route.params.score} / {route.params.num} </Text>
      {route.params.score < 0.5*route.params.num
      ?
      <>
      <Image style={styles.image} source={require('./assets/dontgiveup.jpg')}/>
      <Text style = {styles.text}>Practice makes perfect!</Text>  
      </>
      :
      route.params.score >= 0.9 * route.params.num && route.params.num >= 10
      ?
      <>
      <Image style = { {width: 375, height: 450} } source = {require('./assets/welldone.jpg')}
      />
      <Text style = {styles.text}> Awesome! </Text>
      </>
      :
      <>
      <Image style={ {width: 200, height: 300, resizeMode : 'contain'}} source={require('./assets/goodjob.jpg')}/>
      <Text style = {styles.text}>Good job!</Text>  
      </>
      }
      <Pressable onPress={onPressHome}
        style={({ pressed }) => [{ backgroundColor: pressed ? '#7aeb34' : '#ab346a' },
        styles.button]}>
        <Text style ={styles.text}>Back to Home</Text>
    </Pressable>
    <Pressable onPress={onPressAgain}
        style={({ pressed }) => [{ backgroundColor: pressed ? '#7aeb34' : '#087848' },
        styles.button]}
        >
        <Text style = {styles.text}>Try Again!</Text>
    </Pressable>
    </View>
  )
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Num"
          component={Num}
          options={{
            header: () => null
          }}
        />        
        <Stack.Screen
          name="ChooseOperator"
          component={ChooseOperator}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="PlusQuestions"
          component={PlusQuestions}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="MinusQuestions"
          component={MinusQuestions}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="MultiplyQuestions"
          component={MultiplyQuestions}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="DivideQuestions"
          component={DivideQuestions}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options = {{
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor : '#8fffa5',
    borderWidth : 5,
    borderColor : 'black',
    borderRadius : 10
  },
  back: {
    width: 50,
    height: 50,
    marginLeft : -500,
    marginTop : -100,
    resizeMode :'contain',
    borderColor : 'black',
    borderWidth : 3
  },
  background : {
    flex: 1,
    alignItems : 'stretch',
  },
  burden: {
    width: 90,
    height: 50
  },
  button: {
    width: 252,
    height: 60,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  correct: {
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#168500'
  },
  input: {
    width: 252,
    height: 50,
    backgroundColor : '#d5f0db',
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  horizontal: {
    flexDirection: 'row'
  },
  image: {
    height: 200,
    width: 300,
  },

  operator: {
    height: 200,
    width: 200,
    margin: 10
  },
  operatorPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },

  wrong: {
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fc0303',
  },
})
export default App;

