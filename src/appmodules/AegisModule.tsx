import React from 'react';

import LoadingScreen from '../components/screens/LoadingScreen';
import AuthContext, {AuthProvider} from '../context/AuthContext';
import AppContext, {AppProvider} from '../context/AppProvider';
import AuthRoutes from '../routes/AuthRoutes';
import UserRoutes from '../routes/UserRoutes';
import {AuthStatus} from '../types';

function AegisModule(): React.JSX.Element {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContext.Consumer>
          {appContext => {
            return (
              <AuthContext.Consumer>
                {authContext => {
                  if (authContext.status === AuthStatus.IDLE) {
                    return <LoadingScreen />;
                  }
                  if (authContext.status === AuthStatus.UNAUTHORIZED) {
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

export default AegisModule;
