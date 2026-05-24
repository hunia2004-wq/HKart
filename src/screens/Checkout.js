import React from 'react';
import { TextInput, Alert, TouchableOpacity, Text, View, StyleSheet, Button} from 'react-native';
import { supabase } from '../lib/supabase';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics'

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      HKart Receipt
    </h1>
    <img
      src="https://docs.expo.dev/static/images/expo-logo.svg"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function Checkout({navigation, route}) {
  const [cardholdername, setcardholdername] = React.useState('')
  const [cardnumber, setcardnumber] = React.useState('')
  const [expirydate, setexpirydate] = React.useState('')
  const [cvv, setcvv] = React.useState('')

  async function handleCheckout() {
     console.log('attempting checkout')
     try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error} = await supabase
  .from('orders')
  .insert({ 
  user_id: user.id,
  Total_price: route.params.total,
  status: 'pending',
  payment_method: 'card'
  })
      if (error) throw error
     Alert.alert('order placed successully')
     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch (error) {
    Alert.alert('Error checkout', error.message);
    }
   }

  const printToFile = async () => {
     const { uri } = await Print.printToFileAsync({ html }); 
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            onChangeText={setcardholdername}
            value={cardholdername}
            placeholder="Cardholder Name"
            placeholderTextColor="#9AA5AE"
          />
          <TextInput
            style={styles.input}
            onChangeText={setcardnumber}
            value={cardnumber}
            placeholder="Card Number"
            placeholderTextColor="#9AA5AE"
            secureTextEntry
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              onChangeText={setexpirydate}
              value={expirydate}
              placeholder="Expiry Date"
              placeholderTextColor="#9AA5AE"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              onChangeText={setcvv}
              value={cvv}
              placeholder="CVV"
              placeholderTextColor="#9AA5AE"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Place order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={printToFile}>
            <Text style={styles.buttonText}>Download Receipt</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7CED6',
    padding: 10,
  },
  card: {
    backgroundColor: '#E3E6E8',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    color: '#2E2E2E',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#6F7F8F',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});