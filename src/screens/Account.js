import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../../il8n';
import { View, Alert, TextInput, Text, TouchableOpacity } from 'react-native'
import {useColorScheme, Appearance } from 'react-native';



const styles = StyleSheet.create({
  input: {
    width: 300,
    margin: 12,
    borderWidth: 3,
    borderColor: '#6F7F8F',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7CED6',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});

export default function Account() {
  const [loading, setLoading] = useState(true)
  const session = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [language, setLanguage] = useState(i18n.locale)
  const [nativeColorScheme, setNativeColorScheme] = useState('auto');

  const themeContainerStyle = nativeColorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  useEffect(() => {
    Appearance.setColorScheme(nativeColorScheme);
  }, [nativeColorScheme]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    i18n.locale = newLang;
    setLanguage(newLang);
  }

  const toggleTheme = () => {
    const nextTheme = nativeColorScheme === 'dark' ? 'light' : 'dark';
    setNativeColorScheme(nextTheme);
  };

  useEffect(() => {
    if (session.user.id) getProfile()
  }, [session.user.id])

  async function getProfile() {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website`)
        .eq('id', session.user.id)
        .single()
      if (error && status !== 406) throw error
      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website }) {
    try {
      setLoading(true)
      const updates = {
        id: session.user.id,
        username,
        website,
        updated_at: new Date(),
      }
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
    } catch (error) {
      Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (session === null) return <Text>Loading...</Text>

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View>
        <Text>Email</Text>
        <TextInput
          value={session.user.email ?? ''}
          editable={false}
          selectTextOnFocus={false}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Username</Text>
        <TextInput
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Website</Text>
        <TextInput
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
          style={styles.input}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => updateProfile({ username, website })} disabled={loading}>
          <Text>{loading ? 'Loading ...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleLanguage}>
        <Text>{language === 'en' ? 'Switch to French' : 'Switch to English'}</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>Switch to {nativeColorScheme === 'dark' ? 'Light' : 'Dark'} Mode</Text>
      </TouchableOpacity>
    </View>
  )
}