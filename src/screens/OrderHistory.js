
import {Text, View, FlatList, Alert} from 'react-native';
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

const OrderHistory = ({navigation}) => {
  const [orders, setOrders] = useState([])
const [loading, setLoading] = useState(true)
const fetchOrders= async()=> {

try{

const { data: { user } } = await supabase.auth.getUser()
  let { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)

    if (error) throw error 
 
    setOrders(data)
    setLoading(false)
} catch (error){
  Alert.alert ('No history', error.message)
}
    

}
useEffect(()=>{
  fetchOrders()
},[])




  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Order History</Text>
      <FlatList
                  data={orders}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View>
                
                    <View style={{padding: 10, borderBottomWidth: 1}}>
                      <Text>{item.Total_price} EGP</Text> 
                      <Text>{item.status}</Text>
                      <Text>{item.created_at}</Text>
                      
                    </View>
                    
                    </View>
                    
                  )}
                />
    </View>
  );
};

export default OrderHistory;