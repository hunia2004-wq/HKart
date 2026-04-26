import React from 'react';
import { StyleSheet,Image, TextInput, Text, View, TouchableOpacity } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  logo: {
    width: 300,
    height: 200, 
    
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

  return (
    <SafeAreaProvider style={styles.container} >
      <View>
        <SafeAreaView >
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
          onChangeText={confirmPassword}
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
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{color: 'white', fontSize: 16}}>Register</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );


}
export default Register;
