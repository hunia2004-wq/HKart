import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '../lib/supabase'

const AuthContext = React.createContext();

export { AuthContext };
export default function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        dispatch({ type: 'SIGN_IN', token: data.session.access_token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        if (data.session) {
          dispatch({ type: 'SIGN_IN', token: data.session.access_token });
        } else {
          throw new Error('Please check your email to confirm your account before signing in.');
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}