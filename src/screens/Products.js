import { supabase } from '../lib/supabase'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Image, Alert, FlatList, StyleSheet, Text,ScrollView, TouchableOpacity} from 'react-native'
import * as FileSystem from 'expo-file-system/legacy'
import * as Network from 'expo-network'
import { usePowerState } from 'expo-battery'

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C7CED6',
        width: '100%',
      },
      
      productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#E3E6E8',
        borderRadius: 10,
        width: '100%',
        
      },
      productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
      productName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2E2E2E',
      },
      productPrice: {
        fontSize: 15,
        color: '#6F7F8F',
        marginLeft: 10,
        fontWeight: 'bold',
      },
      button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#6F7F8F',
        marginRight: 10,
      },
      activeButton: {
        backgroundColor: '#A7B3BF',
      },
      text: {
        color: '#2E2E2E',
        fontWeight: 'bold',
      },
     
    }); 
const CACHE_FILE = FileSystem.documentDirectory + 'products_cache.json'
const Products = ({navigation}) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState('all');
  const [categories, setCategories] = React.useState([]);
  const [isOffline, setIsOffline] = useState(false)
  const { lowPowerMode, batteryLevel, batteryState } = usePowerState();
  
   
  



  

const fetchProducts = async () => {
  
  try {
    setLoading(true)
    if (batteryLevel > 0 && batteryLevel < 0.2)  {
  Alert.alert('Low Battery', 'Sync paused to save battery')
  setLoading(false)
  return
}
    const network = await Network.getNetworkStateAsync()
      if (!network.isConnected) {
        setIsOffline(true)
        const cache = await FileSystem.readAsStringAsync(CACHE_FILE)
        if (cache) {
          setProducts(JSON.parse(cache))
        } else {
          Alert.alert('No cached data available')
        }
        return
      }
    

    let query = supabase.from('products').select('*')
    if (category !== 'all') {
      query = query.eq('category', category)
    }

    

    let { data, error } = await query

      if (error) {
        
        throw error
      }
      if (data) {
         
        setProducts(data)
        await FileSystem.writeAsStringAsync(CACHE_FILE, JSON.stringify(data))
setIsOffline(false)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }

  }
 const fetchCategories = async () => {
      let { data, error } = await supabase.from('products')
      .select('category');

      if (data) {
        const uniqueCategories = [...new Set(data.map(item => item.category))]
        setCategories(uniqueCategories)
      }
      
    }
    


  useEffect(() => {
    fetchProducts();
    fetchCategories();
    console.log(products);
    
  }, [category]);


  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {isOffline && <Text style={{backgroundColor: 'red', color: 'white', padding: 10, width: '100%', textAlign: 'center'}}>You are offline - showing cached products</Text>}

        
        {loading ? (
          <Text>Loading....</Text>
        ) : (
          <View style={{ width: '100%' }}>
            <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{flexDirection: 'row'}}
      contentContainerStyle={{alignItems: 'center'}}

      
    >
      <TouchableOpacity
               style={[styles.button, category === 'all' && styles.activeButton]}
                onPress={()=>setCategory('all')}
              >
                <Text style={[styles.text, category === 'all' && styles.activeText]}>All</Text>
              </TouchableOpacity>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.button,
            category === cat && styles.activeButton,
        ]}
          onPress={() => {
            setCategory(cat);
           
          }}
        >
          <Text style={[
            styles.text,
            category === cat && styles.activeText
          ]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  
       

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          
              <View style={styles.productContainer}>
                <Image source={{ uri: item.image_url }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} EGP</Text>
              </View>
              
              </TouchableOpacity>
              
            )}
          />
          
       
        </View>
        )}
         
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Products