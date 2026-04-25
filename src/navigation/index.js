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


const Stack = createNativeStackNavigator()
export default function Navigation() {
const { isLoading, userToken } = React.useContext(AuthContext)
if (isLoading) {
  // We haven't finished checking for the token yet
  return <Welcome/>;
}

const isSignedIn  = userToken != null;

return (
 
  <NavigationContainer>
    <Stack.Navigator>
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
    


  </>
) : (
  <>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </>
)}
    </Stack.Navigator>
  </NavigationContainer>


)
}

