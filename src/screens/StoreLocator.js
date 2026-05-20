import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
const StoreLocator = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    async function fetchstores() {
      // Assuming your table name is 'stores'
      const { data, error } = await supabase
        .from('stores')
        .select('*');

      
      if (error) {
        console.error('Error fetching stores:', error.message);
      } else {
        setStores(data);
      }
    }



    getCurrentLocation();
    fetchstores();
  }, []);


  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords?.latitude ?? 30.0444,
            longitude: location?.coords?.longitude ?? 31.2357,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={store.address}
            />
          ))}
        </MapView>

      ) : (<Text>Location not available</Text>)
      }

    </View>
  );
}



export default StoreLocator;