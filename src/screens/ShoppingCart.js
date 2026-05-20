import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ShoppingCartStore  } from '../hooks/ShoppingCartStore';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7CED6',
    width: '100%',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#E3E6E8',
    borderRadius: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E2E2E',
    flex: 1,
  },
  itemPrice: {
    fontSize: 15,
    color: '#6F7F8F',
    fontWeight: 'bold',
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E57373',
  },
  actionRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#6F7F8F',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2E2E',
    margin: 10,
    padding: 10,
  },
})

export default function ShoppingCart({navigation}) {
  const { items, removeItem, getTotalPrice, clearCart } = ShoppingCartStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Checkout', { total: getTotalPrice().toFixed(2) })}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => clearCart()}>
            <Text style={styles.buttonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalText}>Total: {getTotalPrice().toFixed(2)} EGP</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}