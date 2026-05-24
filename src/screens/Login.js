import React from 'react';
import { StyleSheet,Image, TextInput, Text, View, TouchableOpacity, Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7CED6',
    
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
    borderColor: '#6F7F8F',
    padding: 10,
  },
  

})
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  

  const handleLogin = async () => {
    console.log('attempting login with:', email, password)
     try {
      await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      console.log('login successful')
    } catch (error) {
    Alert.alert('Error signing in:', error.message);
    
    }
    
  };

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
         
        <TouchableOpacity
          style={{
            backgroundColor: '#6F7F8F',
            padding: 10,
            marginTop: 10,
            width: 100,
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          <Text style={{color: 'black', fontSize: 13}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.registerLink} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold', marginTop: 10}}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
              </View>
      </SafeAreaView>

    
  );


}
export default Login;
