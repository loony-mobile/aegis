import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {STYLES} from '../styles';
import axios from 'axios';
import {handleError} from '../utils';
import TextInput from '../components/TextInput';
import ButtonTextInput from '../components/ButtonTextInput';
import {useTheme} from '../context/AppProvider';

export default function Add(props: any) {
  const {appContext, authContext} = props.route.params;
  const {base_url} = appContext;
  const user_id: number = authContext.user.uid;

  const appTheme = useTheme();
  const theme = STYLES[appTheme];
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const saveCred = () => {
    setError('');
    axios
      .post(`${base_url}/creds/add`, {
        user_id,
        name,
        username,
        url,
        password,
        metadata: '',
      })
      .then(() => {})
      .catch(e => {
        handleError(e, setError);
      });
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={[styles.container, theme.con]}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput placeholder="Name" value={name} onChangeText={setName} />

      <TextInput placeholder="Url" value={url} onChangeText={setUrl} />
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />

      <ButtonTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onIconPress={onIconPress}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity style={theme.button} onPress={saveCred}>
        <Text style={theme.btnText}>Add</Text>
      </TouchableOpacity>
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
  text: {
    color: '#2d2d2d',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
