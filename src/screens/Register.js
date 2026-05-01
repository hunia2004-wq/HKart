import React from 'react';
import { StyleSheet, Image, TextInput, Text, View, TouchableOpacity, Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  logo: {
    width: 250,
    height: 150, 
    marginBottom: 10,
    
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'georgia',
    textAlign: 'center',
  },
  
  input: {
    width: 300,
    margin: 12,
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,
  },
  

})
  


const Register = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
    const handleRegister = async () => {
      if (password !== confirmPassword) {
  Alert.alert('Passwords do not match');
  return;
}
         try {
          await supabase.auth.signUp({
            email: email,
            password: password
          });
            Alert.alert('Registration successful! Please check your email to confirm your account.');
        } catch (error) {
        Alert.alert('Error signing up:', error.message);
        
        }
      }
  return (
  
     
        <SafeAreaView style={{ flex:1}} edges={['bottom']} >
           <View style={styles.container}>
              <Image source={require('../assets/Logo.png')} style={styles.logo} />
              <Text style={styles.text}>HKart your cart</Text>
        
   
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
     
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
     
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            padding: 10,

            marginTop: 10,
            width: 100,
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleRegister}
        >
          
        
          <Text style={{color: 'white', fontSize: 16}}>Register</Text>
        </TouchableOpacity>
         </View>
  
      </SafeAreaView>
     
  );


}
export default Register;
