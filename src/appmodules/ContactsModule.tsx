import React, {useEffect, useState} from 'react';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {View, FlatList} from 'react-native';

import TextComponent from '../components/Text';
import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';

const requestMultiplePermissions = async () => {
  requestMultiple([
    PERMISSIONS.ANDROID.READ_CONTACTS,
    PERMISSIONS.ANDROID.WRITE_CONTACTS,
  ]).then(statuses => {
    console.log('READ_CONTACTS', statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
    console.log('WRITE_CONTACTS', statuses[PERMISSIONS.ANDROID.WRITE_CONTACTS]);
  });
};

function ContactsModule() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    requestMultiplePermissions().then(() => {
      loadContacts();
    });
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((_contacts: Contact[]) => {
        console.log(contacts);
        setContacts(_contacts);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <TextComponent style={{fontSize: 18, fontWeight: 'bold'}}>
        Contact List
      </TextComponent>
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({item}) => (
          <View style={{marginVertical: 10, backgroundColor: '#2d2d2d'}}>
            <TextComponent style={{marginVertical: 5}}>
              {item.displayName}
            </TextComponent>
            <TextComponent style={{marginVertical: 5}}>
              {item.phoneNumbers[0] && item.phoneNumbers[0].number}
            </TextComponent>
          </View>
        )}
      />
    </View>
  );
}

export default ContactsModule;
