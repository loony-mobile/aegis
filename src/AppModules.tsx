import React, {useEffect, useState} from 'react';
import {View, BackHandler} from 'react-native';
import AegisModule from './appmodules/AegisModule.tsx';
import {useTheme} from './context/AppProvider';
import {STYLES, styles} from './styles';
import {Indexer} from './types';
import CardComponent from './components/Card.tsx';
import TextComponent from './components/Text.tsx';
import {Row} from './components/Row.tsx';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarWithClear from './Search.tsx';
import PhoneModule from './appmodules/PhoneModules.tsx';
import MessagesModule from './appmodules/MessagesModule.tsx';
import ContactsModule from './appmodules/ContactsModule.tsx';

const MODULES = {
  HOME: 'HOME',
  AEGIS: 'AEGIS',
  PHONE: 'PHONE',
  MESSAGES: 'MESSAGES',
  CONTACTS: 'CONTACTS',
};

function AppModules(): React.JSX.Element {
  const appTheme = useTheme();
  const theme: Indexer = STYLES[appTheme];

  const [module, setModule] = useState(MODULES.HOME);

  useEffect(() => {
    const backAction = () => {
      setModule(MODULES.HOME);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  if (module === MODULES.AEGIS) {
    return <AegisModule />;
  }

  if (module === MODULES.PHONE) {
    return <PhoneModule />;
  }
  if (module === MODULES.MESSAGES) {
    return <MessagesModule />;
  }
  if (module === MODULES.CONTACTS) {
    return <ContactsModule />;
  }

  return (
    <View style={[theme.con, styles.container]}>
      <SearchBarWithClear />
      <Row>
        <CardComponent onPress={() => setModule(MODULES.AEGIS)}>
          <SimpleLineIcons name="lock" size={30} color="white" />
          <TextComponent>Aegis</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule(MODULES.PHONE)}>
          <SimpleLineIcons name="phone" size={30} color="white" />
          <TextComponent>Phone</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule(MODULES.CONTACTS)}>
          <AntDesign name="contacts" size={30} color="white" />
          <TextComponent>Contacts</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule(MODULES.MESSAGES)}>
          <AntDesign name="message1" size={30} color="white" />
          <TextComponent>Messages</TextComponent>
        </CardComponent>
      </Row>
    </View>
  );
}

export default AppModules;
