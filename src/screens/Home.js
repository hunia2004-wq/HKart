import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Home = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Welcome to HKart</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
        navigation.navigate('Login')
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;