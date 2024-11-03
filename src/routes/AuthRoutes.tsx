import React, {useState} from 'react';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

export default function AuthRoutes({authContext}: any) {
  const [state, setComponentState] = useState('LOGIN');
  return (
    <>
      {state === 'LOGIN' ? (
        <Login
          setComponentState={setComponentState}
          authContext={authContext}
        />
      ) : (
        <Signup setComponentState={setComponentState} />
      )}
    </>
  );
}
