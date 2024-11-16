/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {theme} from '../styles';
import Button, {DeleteButton} from '../components/Button';
import axios from 'axios';
import {handleError} from '../utils';
import {Indicator} from '../types';
import ButtonTextInput from '../components/ButtonTextInput';

export default function Edit(props: any) {
  const {appContext} = props.route.params;
  const {base_url} = appContext;

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
      setPassword(params.password);
    }
  }, []);

  const handleDelete = () => {
    console.log(`${base_url}/api/creds/delete/${props.route.params.uid}`);
    axios
      .post(`${base_url}/api/creds/delete/${props.route.params.uid}`)
      .then(() => {})
      .catch(e => {
        console.log(e.response);
      });
  };

  const updateCred = () => {
    setLoadingIndicator(Indicator.LOADING);
    setError('');
    axios
      .post(`${base_url}/api/creds/edit`, {
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
    <View style={[styles.container, theme.dark.con]}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Url"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <ButtonTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onIconPress={onIconPress}
        secureTextEntry={secureTextEntry}
      />

      <Button
        text="Update"
        loadingIndicator={loadingIndicator}
        onPress={updateCred}
      />
      <DeleteButton
        text="Delete"
        loadingIndicator={loadingIndicator}
        onPress={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#8d8d8d',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#363636',
    color: '#ccc',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
