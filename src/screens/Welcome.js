import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7CED6',
  },
  logo: {
    width: 450,
    height: 250,
    
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'georgia',
  },
})  
const Welcome = ({ navigation }) => {
  const session = useContext(AuthContext)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) {
    navigation.replace('Home')
  } 
  else {
    navigation.replace('Login')  
  }
}, 3000)
  return () => clearTimeout(timer)
  }, [navigation, session])
  
  return (
 
    <SafeAreaView style={styles.container}>
       <Image 
  source={require('../assets/Logo.png')} 
  style={styles.logo}
  fadeDuration={0}
/>
      <Text style={ {color: 'black', fontSize: 23} }>HKart your cart</Text>
    </SafeAreaView>

    );
 
  };
export default Welcome;

