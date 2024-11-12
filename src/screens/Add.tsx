import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles';

export default function Add() {
  const [isHidden, setIsHidden] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');

  const saveCred = () => {
    fetch('', {
      method: 'POST',
      body: JSON.stringify({name, username, url, password}),
    });
  };

  const viewPassword = () => {
    setIsHidden(!isHidden);
  };

  return (
    <View style={[styles.container, theme.dark.con]}>
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

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={isHidden ? false : true}
      />
      <TouchableOpacity onPress={viewPassword} style={styles.buttonIcon}>
        <Icon
          name={isHidden ? 'eye-outline' : 'eye-off-outline'}
          size={18}
          color="gray"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveCred}>
        <Text style={styles.buttonText}>Add</Text>
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
    width: 40,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
