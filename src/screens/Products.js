import { supabase } from '../lib/supabase'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Image, Alert, FlatList, StyleSheet, Text,} from 'react-native'



const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
      productName: {
        fontSize: 18,
      },
      productPrice: {
        fontSize: 16,
        color: 'gray',
      },
    }); 

const Products = ({navigation}) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  

const fetchProducts = async () => {
  try {
    setLoading(true)
    let { data, error } = await supabase
      .from('products')
      .select('*')
        
      if (error) {
        
        throw error
      }
      if (data) {
         
        setProducts(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Products</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image source={{ uri: item.image_url }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Products