import React from 'react';

import LoadingScreen from './components/screens/LoadingScreen';
import AuthContext, {AuthProvider} from './context/AuthContext';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import {Auth} from './types';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {authContext => {
          if (authContext.auth === Auth.LOADING) {
            return <LoadingScreen />;
          }
          if (authContext.auth === Auth.FALSE) {
            return <AuthRoutes authContext={authContext} />;
          }
          return <UserRoutes authContext={authContext} />;
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
