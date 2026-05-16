import React from 'react';
import { TextInput, Alert, TouchableOpacity, Text, View, StyleSheet, Button} from 'react-native';
import { supabase } from '../lib/supabase';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';
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

export default function Checkout({navigation}) {
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
  Total_price: 0,
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
    // On iOS/android prints the given html. On web prints the HTML from the current page.
     const { uri } = await Print.printToFileAsync({ html }); 
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };



  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button title="Download Receipt" onPress={printToFile} />
      </View>
       <TextInput
                style={styles.input}
                onChangeText={setcardholdername}
                value={cardholdername}
                placeholder="Cardholder Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={setcardnumber}
                value={cardnumber}
                placeholder="Card Number"
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                onChangeText={setexpirydate}
                value={expirydate}
                placeholder="Expiry Date"
              />
              <TextInput
                style={styles.input}
                onChangeText={setcvv}
                value={cvv}
                placeholder="CVV"
                secureTextEntry
              />
              <TouchableOpacity onPress={handleCheckout}>
                <Text>Place order</Text>
              </TouchableOpacity>
              
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },

});

