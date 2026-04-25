import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 500,
    height: 250,
    
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
})  
const Welcome = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
  navigation.navigate('Login')
  }, 50000)
  
  return () => clearTimeout(timer)
  }, [navigation])
  return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.text}>HKart your way</Text>
    </SafeAreaView>
 </SafeAreaProvider>
    );
 
  };
export default Welcome;

