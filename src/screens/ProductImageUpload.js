
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
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
export default function ProductImageUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
 
    const ImageUpload = async () => {
      setUploading(true)
    try {
      
      
      const arraybuffer = await fetch(image).then((res) => res.arrayBuffer())
      const fileExt = image.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`
      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(path, arraybuffer, {
          contentType:'image/jpeg',
        })
      if (uploadError) {
        throw uploadError
      }
      Alert.alert('Success', 'Image uploaded successfully!')
    } catch (error) {
      if (error) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  return (
   
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
       <TouchableOpacity onPress={pickImage}>
      <Text>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {image && (<TouchableOpacity onPress={ImageUpload} >
            <Text>Upload Image</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}
