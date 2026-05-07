import React from 'react';
import {Text, View} from 'react-native';
import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';
import {supabase} from '../lib/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
});

const BarcodeScanner = ({navigation}) => {


  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
   
async function handleBarCodeScanned(result) {
  
    const scannedData = result.data;
 
    
   
   const  { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('barcode', scannedData)
      .single();
      
      
      
 setScanned(true);

    if (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      return;
    }

    navigation.navigate('ProductDetails', { product });
  } 

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
    barcodeTypes: ["qr", "ean13"]
  }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default BarcodeScanner;