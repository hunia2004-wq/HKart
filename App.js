
import { useState, useEffect } from 'react'
import { supabase } from './src/lib/supabase'
import Auth from './src/components/Auth'
import Account from './src/screens/Account'
import { View } from 'react-native'

export default function App() {
   const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState(null)
  useEffect(() => {
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      }
    })
    supabase.auth.onAuthStateChange(async (_event, _session) => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims()
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      } else {
        setUserId(null)
        setEmail(undefined)
      }
    })
  }, [])

  return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        {userId ? <Account key={userId} userId={userId} email={email} /> : <Auth />}
      </View>
    
  );
  
}

 