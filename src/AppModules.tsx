import React, {useState} from 'react';
import {View} from 'react-native';
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

function AppModules(): React.JSX.Element {
  const appTheme = useTheme();
  const theme: Indexer = STYLES[appTheme];

  const [module, setModule] = useState('HOME');

  if (module === 'AEGIS') {
    return <AegisModule />;
  }

  if (module === 'PHONE') {
    return <PhoneModule />;
  }
  if (module === 'MESSAGES') {
    return <MessagesModule />;
  }
  if (module === 'CONTACTS') {
    return <ContactsModule />;
  }

  return (
    <View style={[theme.con, styles.container]}>
      <SearchBarWithClear />
      <Row>
        <CardComponent onPress={() => setModule('AEGIS')}>
          <SimpleLineIcons name="lock" size={30} color="white" />
          <TextComponent>Aegis</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule('PHONE')}>
          <SimpleLineIcons name="phone" size={30} color="white" />
          <TextComponent>Phone</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule('CONTACTS')}>
          <AntDesign name="contacts" size={30} color="white" />
          <TextComponent>Contacts</TextComponent>
        </CardComponent>
        <CardComponent onPress={() => setModule('MESSAGES')}>
          <AntDesign name="message1" size={30} color="white" />
          <TextComponent>Messages</TextComponent>
        </CardComponent>
      </Row>
    </View>
  );
}

export default AppModules;
