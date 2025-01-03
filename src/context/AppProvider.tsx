import React, {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import config from '../../configs/app.config.json';
const appConfig: any = config;
const currentConfig = appConfig[appConfig.env];
const {API_URL} = currentConfig;

export type AppContextProps = {
  base_url: string;
  theme: string | null | undefined;
  setAppContext: (_: any) => void;
};

const AppContext = createContext<AppContextProps>({
  base_url: '',
  theme: 'dark',
  setAppContext: (_: any) => {},
});

export const AppProvider = ({children}: PropsWithChildren) => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme();

  const [context, setAppContext] = useState({
    base_url: API_URL,
    theme: colorScheme,
  });

  return (
    <AppContext.Provider value={{...context, setAppContext}}>
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(AppContext);
  if (!context || !context.theme) {
    return 'dark';
  }

  return context.theme;
};

export default AppContext;
