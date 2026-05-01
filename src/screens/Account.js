import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View, Alert, TextInput, Text, TouchableOpacity } from 'react-native'
import Avatar from '../components/Avatar'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Account() {
  const [loading, setLoading] = useState(true)
  const session = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
 

  useEffect(() => {
    if (session.user.id) getProfile()
  }, [session.user.id])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) 
  {
    try {
      setLoading(true)

      const updates = {
        id: session.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
 if (session === null) {
    return <Text>Loading...</Text>
  }
  return (
    <View >
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
          }}
        />
      </View>
      <View >
        <Text >Email</Text>
        <TextInput
          value={session.user.email ?? ''}
          editable={false}
          selectTextOnFocus={false}
          
        />
      </View>
      <View >
        <Text   >Username</Text>
        <TextInput
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
          
        />
      </View>
      <View >
        <Text >Website</Text>
        <TextInput
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View >
        <TouchableOpacity
          
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        >
          <Text >{loading ? 'Loading ...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity  onPress={() => supabase.auth.signOut()}>
          <Text >Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  
}