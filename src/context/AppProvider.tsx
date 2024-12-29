import React, {
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import config from '../../configs/app.config.json';
const appConfig: any = config;
const currentConfig = appConfig[appConfig.env];
const {API_URL} = currentConfig;

// Create the context
const AppContext = createContext({
  base_url: '',
  setAppContext: (_: any) => {
    return;
  },
});

// Create a provider component
export const AppProvider = ({children}: PropsWithChildren) => {
  const [context, setAppContext] = useState({
    base_url: API_URL,
  });

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={{...context, setAppContext}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
