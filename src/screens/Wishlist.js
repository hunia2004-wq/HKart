import React from 'react';
import {Text, View} from 'react-native';
import { useState, useEffect } from 'react'
import { FlatList, Alert, TouchableOpacity} from 'react-native'
import { supabase } from '../lib/supabase'
import * as Haptics from 'expo-haptics'

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
    
    <View
  
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <FlatList
  data={wishlist}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
     
         <TouchableOpacity onPress={() => deleteFromWishlist(item.id)}>
            <Text>Remove item</Text>
         </TouchableOpacity>

      <Text>{item.products.name}</Text>
      <Text>{item.products.price} EGP</Text>
    </View>
  )}
/>
      <Text>Wishlist</Text>
    </View>
  );
};

export default Wishlist;