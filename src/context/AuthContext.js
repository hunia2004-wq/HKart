import React from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = React.createContext(null)

function AuthProvider({ children }) {
  const [session, setSession] = React.useState(null)

  React.useEffect(() => {
    const {data: { subscription }} = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={session}>
     {children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthProvider }