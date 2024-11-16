/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {theme} from '../styles';
import Button from '../components/Button';
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
  button: {
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#2d2d2d',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonIcon: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
