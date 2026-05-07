import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ShoppingCartStore  } from '../hooks/ShoppingCartStore';

export default function ShoppingCart({navigation}) {
  const { items, removeItem, getTotalPrice, clearCart } = ShoppingCartStore();

  return (
    <View>
      {items.map((item) => (
        <View key={item.id}>
          <Text>{item.name} x {item.quantity}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text>Remove item</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('Products', { product: item })}>
            <Text>Continue shopping</Text>
         </TouchableOpacity>
         
         
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate('Checkout', { total: getTotalPrice().toFixed(2) })}>
            <Text>Checkout</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => clearCart()}>
            <Text>Clear Cart</Text>
         </TouchableOpacity>

      <Text>Total: {getTotalPrice().toFixed(2)} EGP</Text>
    </View>
  );
}
