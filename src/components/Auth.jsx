import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../lib/supabase'


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <View >
        <Text >Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          
        />
      </View>
      <View >
        <Text >Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          
        />
      </View>
      <View >
        <TouchableOpacity
         
          onPress={() => signInWithEmail()}
          disabled={loading}
        >
          <Text >Sign in</Text>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity
        
          onPress={() => signUpWithEmail()}
          disabled={loading}
        >
          <Text >Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}