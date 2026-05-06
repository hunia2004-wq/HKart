import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
  logo: {
    width: 300,
    height: 300,
  },
});

const ProductDetails = ({ navigation, route }) => {
const { product } = route.params

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
      <Image
        style={styles.tinyLogo}
        source={{ uri: product.image_url }} 
        />
      
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} EGP</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart', { product })}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wishlist', { product })}>
        <Text style={styles.buttonText}>Add to Wishlist</Text>  
      </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default ProductDetails