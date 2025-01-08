/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {STYLES} from '../styles';
import Button, {DeleteButton} from '../components/Button';
import axios from 'axios';
import {handleError} from '../utils';
import {Indicator} from '../types';
import TextInput from '../components/TextInput';
import ButtonTextInput from '../components/TextInputIcon';
import {useTheme} from '../context/AppProvider';

export default function Edit(props: any) {
  const {appContext} = props.route.params;
  const {base_url} = appContext;

  const appTheme = useTheme();
  const theme = STYLES[appTheme];
  const [loadingIndicator, setLoadingIndicator] = useState(Indicator.IDLE);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (props.route.params) {
      const params = props.route.params;
      setName(params.name);
      setUsername(params.username);
      setUrl(params.url);
      setPassword('*****');
    }
  }, []);

  const handleDelete = () => {
    console.log(`${base_url}/creds/delete/${props.route.params.uid}`);
    axios
      .post(`${base_url}/creds/delete/${props.route.params.uid}`)
      .then(() => {})
      .catch(e => {
        console.log(e.response);
      });
  };

  const updateCred = () => {
    setLoadingIndicator(Indicator.LOADING);
    setError('');
    axios
      .post(`${base_url}/creds/edit`, {
        uid: props.route.params.uid,
        name,
        username,
        url,
        password,
        metadata: '',
      })
      .then(() => {
        setLoadingIndicator(Indicator.IDLE);
      })
      .catch(e => {
        handleError(e, setError);
        setLoadingIndicator(Indicator.IDLE);
      });
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleDelete,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={[styles.container, theme.con]}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        theme={theme}
      />

      <TextInput
        placeholder="Url"
        value={url}
        onChangeText={setUrl}
        theme={theme}
      />
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        theme={theme}
      />

      <ButtonTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onIconPress={onIconPress}
        secureTextEntry={secureTextEntry}
        theme={theme}
      />

      <Button
        text="Update"
        loadingIndicator={loadingIndicator}
        onPress={updateCred}
        theme={theme}
      />
      <DeleteButton
        text="Delete"
        loadingIndicator={loadingIndicator}
        onPress={confirmDelete}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
