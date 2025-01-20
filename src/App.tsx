import React from 'react';
import AppModules from './AppModules.tsx';

import {NativeModules, Linking} from 'react-native';

const {CallScreeningModule} = NativeModules;

CallScreeningModule.startService();
Linking.openSettings();

function App(): React.JSX.Element {
  return <AppModules />;
}

export default App;
