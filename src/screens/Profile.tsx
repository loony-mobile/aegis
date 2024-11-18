import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStatus} from '../types';
import {theme} from '../styles';

export default function Profile(props: any) {
  const {setAuthContext} = props.route.params.authContext;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('AUTH_TOKEN_EXPIRY');
    setAuthContext({
      user: null,
      status: AuthStatus.UNAUTHORIZED,
    });
  };

  return (
    <View style={[styles.container, theme.dark.con]}>
      <TouchableOpacity style={theme.dark.button} onPress={handleLogout}>
        <Text style={theme.dark.button_text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
