import React from 'react'
import {Alert, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, View} from 'react-native';
import ShoppingCartStore from '../hooks/ShoppingCartStore';
import { supabase } from '../lib/supabase'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import i18n from '../../il8n';
import { useContext } from 'react'
import { CurrencyContext } from '../../App'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7CED6',
    padding: 16,
  },
  tinyimage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  nameAndPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'georgia',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D5A6C',
    fontFamily: 'georgia',
  },
  productDescription: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'helvetica',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#6F7F8F',
    padding: 12,
    borderRadius: 8,
    width: '47%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'georgia',
  },
});

const ProductDetails = ({ navigation, route }) => {
const { product } = route.params
const { addItem } = ShoppingCartStore()
const { currency } = useContext(CurrencyContext)
const rates = { EGP: 1, USD: 0.02, EUR: 0.019, SAR: 0.075 }
const convertPrice = (price) => (price * rates[currency]).toFixed(2)

const sendNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Added to Cart! 🛒',
      body: `${product.name} has been added to your cart.`,
    },
    trigger: null,
  });
}

const addToWishlist = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('wishlist')
      .insert({ 
        user_id: user.id,
        product_id: product.id
      })
    if (error) throw error 
    Alert.alert('Success', 'Added to wishlist!')
  } catch (error){
    Alert.alert('Nothing in wishlist', error.message)
  }
}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyimage}
        source={{ uri: product.image_url }} 
        />
      <View style={styles.nameAndPrice}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{convertPrice(product.price)} {currency}</Text>
      </View>
      <Text style={styles.productDescription}>{product.description}</Text>
      {product.stock_quantity <= 0 && <Text style={{color: 'red', fontWeight: 'bold'}}>{i18n.t('outOfStock')}</Text>}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={() => { 
            if (product.stock_quantity <= 0) return;
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); 
            addItem(product);
            sendNotification();
            Alert.alert('Added to Cart', `${product.name} has been added to your cart.`) 
          }}
          style={[styles.button, {opacity: product.stock_quantity <= 0 ? 0.4 : 1}]}
        >
          <Text style={styles.buttonText}>{i18n.t('addToCart')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => { 
            if (product.stock_quantity <= 0) return;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); 
            addToWishlist()
          }}
          style={[styles.button, {opacity: product.stock_quantity <= 0 ? 0.4 : 1}]}
        >
          <Text style={styles.buttonText}>{i18n.t('addToWishlist')}</Text>  
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default ProductDetails