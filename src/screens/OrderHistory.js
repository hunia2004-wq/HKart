import {Text, View, FlatList, Alert, StyleSheet} from 'react-native';
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7CED6',
    width: '100%',
  },
  card: {
    backgroundColor: '#E3E6E8',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E2E2E',
  },
  status: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: '#6F7F8F',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  date: {
    fontSize: 12,
    color: '#6F7F8F',
    marginTop: 4,
  },
})

const OrderHistory = ({navigation}) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      let { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
      if (error) throw error
      setOrders(data)
      setLoading(false)
    } catch (error) {
      Alert.alert('No history', error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.price}>{item.Total_price} EGP</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderHistory;