import React from 'react';
import {Text, View} from 'react-native';

const BarcodeScanner = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Barcode Scanner</Text>
    </View>
  );
};

export default BarcodeScanner;