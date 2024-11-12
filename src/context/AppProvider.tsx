import React, {
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';

const base_url = process.env.API || '';

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
    base_url,
  });

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={{...context, setAppContext}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
