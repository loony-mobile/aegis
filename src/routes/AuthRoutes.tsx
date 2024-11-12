import React, {useState} from 'react';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

export default function AuthRoutes(props: any) {
  const [state, setComponentState] = useState('LOGIN');
  return (
    <>
      {state === 'LOGIN' ? (
        <Login {...props} setComponentState={setComponentState} />
      ) : (
        <Signup {...props} setComponentState={setComponentState} />
      )}
    </>
  );
}
