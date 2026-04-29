import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {AuthContext} from '../context/AuthContext';


const Home = ({navigation}) => {
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
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.buttonText}>Products</Text>
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShoppingCart')}
      >
        <Text style={styles.buttonText}>Shopping Cart</Text>
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Wishlist')}
      >
        <Text style={styles.buttonText}>Wishlist</Text>
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Text style={styles.buttonText}>Order History</Text>
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StoreLocator')}
      >
        <Text style={styles.buttonText}>Store Locator</Text>
       
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BarcodeScanner')}
      >
        <Text style={styles.buttonText}>Barcode Scanner</Text>
       
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