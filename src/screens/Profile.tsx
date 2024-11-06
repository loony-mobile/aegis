import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {Auth} from '../types';
import {theme} from '../styles';

export default function Profile(props: any) {
  const {setAuthContext} = props.route.params.authContext;

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {});
    await AsyncStorage.clear();
    setAuthContext({
      user: null,
      auth: Auth.FALSE,
    });
  };

  return (
    <View style={[styles.container, theme.dark.con]}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
