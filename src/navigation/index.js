import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext';
import Home from '../screens/Home';
import Login from '../screens/Login';
import BarcodeScanner from '../screens/BarcodeScanner';
import Checkout from '../screens/Checkout';
import OrderHistory from '../screens/OrderHistory';
import ProductDetails from '../screens/ProductDetails';
import Products from '../screens/Products';
import Register from '../screens/Register';
import ShoppingCart from '../screens/ShoppingCart';
import Storelocator from '../screens/StoreLocator';
import Welcome from '../screens/Welcome';
import Wishlist from '../screens/Wishlist';
import Account from '../screens/Account';
import ProductImageUpload from '../screens/ProductImageUpload';
import * as Linking from 'expo-linking'




const Stack = createNativeStackNavigator()
export default function Navigation() {
const session = React.useContext(AuthContext)


const isSignedIn = session !== null;
const linking = {
  prefixes: [Linking.createURL('/'), 'hkart://'],
  config: {
    screens: {
      ProductDetails: 'product/:id',
      Products: 'products',
      Home: 'home',
    }
  }
}
return (
 
  <NavigationContainer linking={linking}>
    <Stack.Navigator initialRouteName={isSignedIn ? 'Home' : 'Welcome'}>
      
      
     
      {isSignedIn ? (
  <>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Products" component={Products} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
    <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="StoreLocator" component={Storelocator} />
    <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
    <Stack.Screen name="Wishlist" component={Wishlist} />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="ProductImageUpload" component={ProductImageUpload} />
    
    


  </>
) : (
  <>
    
<Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false }}/>
<Stack.Screen name="Welcome" component={Welcome} />
<Stack.Screen name="Register" component={Register} />
  </>
)}
    </Stack.Navigator>
  </NavigationContainer>


)
}

