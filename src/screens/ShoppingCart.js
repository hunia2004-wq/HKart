import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ShoppingCartStore } from '../hooks/ShoppingCartStore';
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    backgroundColor: '#6F7F8F',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E2E2E',
    minWidth: 20,
    textAlign: 'center',
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
  const { items, addItem, removeItem, getTotalPrice, clearCart } = ShoppingCartStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => removeItem(item.id)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => addItem(item)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
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