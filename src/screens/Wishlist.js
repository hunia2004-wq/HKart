import React from 'react';
import {Text, View} from 'react-native';
import { useState, useEffect } from 'react'
import { FlatList, Alert, TouchableOpacity,StyleSheet} from 'react-native'
import { supabase } from '../lib/supabase'
import * as Haptics from 'expo-haptics'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7CED6',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'georgia',
    color: 'black',
  },
  price: {
    fontSize: 14,
    color: '#3D5A6C',
    fontFamily: 'georgia',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#6F7F8F',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'georgia',
  },
});
const Wishlist = ({navigation}) => {
const [wishlist, setWishlist] = useState([])
const [loading, setLoading] = useState(true)
const deleteFromWishlist = async (id) => {
    
  try {
    const { error } = await supabase.from('wishlist').delete().eq('id', id)
    if (error) throw error
    Haptics.selectionAsync()
    fetchWishlist()
  } catch (error) {
    Alert.alert('Error', error.message)
  }
}
const fetchWishlist= async()=> {
  
  
  try{
  
  const { data: { user } } = await supabase.auth.getUser()
    let { data, error } = await supabase
      .from('wishlist')
      .select('*, products(*)')
      .eq('user_id', user.id)
      if (error) throw error 
   
      setWishlist(data)
      setLoading(false)
  } catch (error){
    Alert.alert ('No history', error.message)
  }
      
  
  }
  useEffect(()=>{
    fetchWishlist()
  },[])
  return (
    
    <View style={styles.container}>
     
        <FlatList contentContainerStyle={styles.list}
  data={wishlist}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.card}>
     
         <TouchableOpacity style={styles.button} onPress={() => deleteFromWishlist(item.id)}>
            <Text style={styles.buttonText}>Remove item</Text>
         </TouchableOpacity>

      <Text style={styles.name}>{item.products.name}</Text>
      <Text style={styles.price}>{item.products.price} EGP</Text>
    </View>
  )}
/>
    </View>
  );
};

export default Wishlist;