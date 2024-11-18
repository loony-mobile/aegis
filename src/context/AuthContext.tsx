import React, {useState, PropsWithChildren, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStatus, AuthContextProps, Auth} from '../types';

const authContextProps: AuthContextProps = {
  status: AuthStatus.IDLE,
  user: null,
  setAuthContext: () => {
    return;
  },
};

export const AuthContext =
  React.createContext<AuthContextProps>(authContextProps);

const useAuthContext = (): [
  Auth,
  React.Dispatch<React.SetStateAction<Auth>>,
] => {
  const [authContext, setAuthContext] = useState<Auth>({
    status: AuthStatus.IDLE,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const authUser = await AsyncStorage.getItem('AUTH_USER');
      const expiryTime = await AsyncStorage.getItem('AUTH_TOKEN_EXPIRY');
      if (authUser && expiryTime) {
        const isExpired = Date.now() > parseInt(expiryTime, 10);

        if (isExpired) {
          await AsyncStorage.removeItem('AUTH_TOKEN_EXPIRY');
          setTimeout(() => {
            setAuthContext({
              user: null,
              status: AuthStatus.UNAUTHORIZED,
            });
          }, 1000);
        } else {
          setTimeout(() => {
            setAuthContext({
              user: JSON.parse(authUser),
              status: AuthStatus.AUTHORIZED,
            });
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setAuthContext({
            user: null,
            status: AuthStatus.UNAUTHORIZED,
          });
        }, 1000);
      }
    };

    loadToken();
  }, []);
  return [authContext, setAuthContext];
};

// Create a provider component
export const AuthProvider = ({children}: PropsWithChildren) => {
  const [context, setAuthContext] = useAuthContext();

  return (
    <AuthContext.Provider value={{...context, setAuthContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
