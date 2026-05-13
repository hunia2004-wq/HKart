import React from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
const StoreLocator = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

    getCurrentLocation();
  }, []);


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        longitude: location?.coords?.longitude,
        latitude: location?.coords?.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      />
    </View>
  );
}




export default StoreLocator;