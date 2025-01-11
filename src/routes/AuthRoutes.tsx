import React, {useEffect, useState} from 'react';
import Login from '../auth/Login';
import LoginWithPin from '../auth/LoginWithPin';
import Signup from '../auth/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthRoutes(props: any) {
  const [state, setComponentState] = useState('');
  const [userSession, setUserSession] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('AUTH_USER');
      if (user) {
        setUserSession(JSON.parse(user));
        setComponentState('LOGIN_PIN');
      } else {
        setComponentState('LOGIN_PASSWORD');
      }
    })();
  }, []);

  return (
    <>
      {state === 'LOGIN_PIN' && (
        <LoginWithPin
          {...props}
          setComponentState={setComponentState}
          userSession={userSession}
        />
      )}
      {state === 'LOGIN_PASSWORD' && (
        <Login {...props} setComponentState={setComponentState} />
      )}
      {state === 'SIGNUP' && (
        <Signup {...props} setComponentState={setComponentState} />
      )}
    </>
  );
}
