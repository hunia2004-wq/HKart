import React from 'react'
import {Alert, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet } from 'react-native';
import ShoppingCartStore from '../hooks/ShoppingCartStore';
import { supabase } from '../lib/supabase'
import * as Haptics from 'expo-haptics'


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
const { addItem } = ShoppingCartStore()
const addToWishlist= async()=> {

try{

const { data: { user } } = await supabase.auth.getUser()
    const { error} = await supabase
      .from('wishlist')
      .insert({ 
      user_id: user.id,
     product_id: product.id
      })
    if (error) throw error 
 Alert.alert('Success', 'Added to wishlist!')
   
} catch (error){
  Alert.alert ('Nothing in wishlist', error.message)
}
    

}

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
      
      <TouchableOpacity onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); addItem(product); Alert.alert('Added to Cart', `${product.name} has been added to your cart.` ) }}>
        <Text style={styles.buttonText} >Add to Cart</Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{ Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); addToWishlist()}}>
        <Text style={styles.buttonText}>Add to Wishlist</Text>  
      </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default ProductDetails