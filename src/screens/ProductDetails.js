import React from 'react'
import {Alert, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet } from 'react-native';
import ShoppingCartStore from '../hooks/ShoppingCartStore';
import { supabase } from '../lib/supabase'
import * as Haptics from 'expo-haptics'
import i18n from '../../il8n';


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
      {product.stock_quantity <= 0 && <Text style={{color: 'red', fontWeight: 'bold'}}>{i18n.t('outOfStock')}</Text>}
      
     <TouchableOpacity 
  onPress={() => { 
    if (product.stock_quantity <= 0) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); 
    addItem(product); 
    Alert.alert('Added to Cart', `${product.name} has been added to your cart.`) 
  }}
  style={{opacity: product.stock_quantity <= 0 ? 0.4 : 1}}
>
  <Text style={styles.buttonText}>{i18n.t('addToCart')}</Text>
</TouchableOpacity>
      <TouchableOpacity 
  onPress={() => { 
    if (product.stock_quantity <= 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); 
    addToWishlist()
  }}
  style={{opacity: product.stock_quantity <= 0 ? 0.4 : 1}}
>
  <Text style={styles.buttonText}>{i18n.t('addToWishlist')}</Text>  
</TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default ProductDetails