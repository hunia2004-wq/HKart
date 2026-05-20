import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { supabase } from '../lib/supabase';

const Home = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>HKart your cart</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Products')}>
          <Text style={styles.buttonText}>🛍️{'\n'}Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShoppingCart')}>
          <Text style={styles.buttonText}>🛒{'\n'}Shopping Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Wishlist')}>
          <Text style={styles.buttonText}>❤️{'\n'}Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.buttonText}>📦{'\n'}Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StoreLocator')}>
          <Text style={styles.buttonText}>📍{'\n'}Store Locator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BarcodeScanner')}>
          <Text style={styles.buttonText}>📷{'\n'}Barcode Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
          <Text style={styles.buttonText}>👤{'\n'}Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductImageUpload')}>
          <Text style={styles.buttonText}>📤{'\n'}Image Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.buttonText}>💳{'\n'}Checkout</Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#C7CED6',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'georgia',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#6F7F8F',
    width: '47%',
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: '#6F7F8F',
    padding: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'georgia',
    textAlign: 'center',
  },
});

export default Home;