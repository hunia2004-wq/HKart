import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View, Alert, TextInput, Text, TouchableOpacity } from 'react-native'
import Avatar from '../components/Avatar'

export default function Account({ userId, email }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (userId) getProfile()
  }, [userId])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', userId)
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
        id: userId,
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
          value={email ?? ''}
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