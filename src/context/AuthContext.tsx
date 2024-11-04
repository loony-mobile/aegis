import React, {
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Auth} from '../types/index';

// Create the context
const AuthContext = createContext({
  user: null,
  auth: Auth.LOADING,
  setAuthContext: (_: any) => {
    return;
  },
});

// Create a provider component
export const AuthProvider = ({children}: PropsWithChildren) => {
  const [context, setAuthContext] = useState({
    user: null,
    auth: Auth.LOADING,
  });

  useEffect(() => {
    const loadToken = async () => {
      const authUser = await AsyncStorage.getItem('AUTH_USER');
      const expiryTime = await AsyncStorage.getItem('AUTH_TOKEN_EXPIRY');
      if (authUser && expiryTime) {
        const isExpired = Date.now() > parseInt(expiryTime, 10);

        if (isExpired) {
          // If the session is expired, clear the token
          await AsyncStorage.removeItem('AUTH_USER');
          await AsyncStorage.removeItem('AUTH_TOKEN_EXPIRY');
        } else {
          setTimeout(() => {
            setAuthContext({
              user: JSON.parse(authUser),
              auth: Auth.TRUE,
            });
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setAuthContext({
            user: null,
            auth: Auth.FALSE,
          });
        }, 1000);
      }
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{...context, setAuthContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
