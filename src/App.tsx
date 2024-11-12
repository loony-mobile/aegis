import React from 'react';

import LoadingScreen from './components/screens/LoadingScreen';
import AuthContext, {AuthProvider} from './context/AuthContext';
import AppContext, {AppProvider} from './context/AppProvider';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import {Auth} from './types';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContext.Consumer>
          {appContext => {
            return (
              <AuthContext.Consumer>
                {authContext => {
                  if (authContext.auth === Auth.LOADING) {
                    return <LoadingScreen />;
                  }
                  if (authContext.auth === Auth.FALSE) {
                    return (
                      <AuthRoutes
                        authContext={authContext}
                        appContext={appContext}
                      />
                    );
                  }
                  return (
                    <UserRoutes
                      authContext={authContext}
                      appContext={appContext}
                    />
                  );
                }}
              </AuthContext.Consumer>
            );
          }}
        </AppContext.Consumer>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
