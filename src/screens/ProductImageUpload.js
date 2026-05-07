import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, Button, Image, View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
})

const ProductImageUpload = () => {
const [image, setImage] = useState(null)









}
export default ProductImageUpload

