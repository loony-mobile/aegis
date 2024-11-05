/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles';

export default function Edit(props: any) {
  const [isHidden, setIsHidden] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');

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
    firestore()
      .collection('credentials')
      .doc(props.route.params.id)
      .update({
        name,
        username,
        url,
        password,
      })
      .then(() => {
        Alert.alert('Updated.');
        props.navigation.goBack();
      });
  };

  const viewPassword = () => {
    setIsHidden(!isHidden);
  };

  return (
    <View style={[styles.container, theme.dark]}>
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
      <TouchableOpacity style={styles.button} onPress={updateCred}>
        <Text style={styles.buttonText}>Update</Text>
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
