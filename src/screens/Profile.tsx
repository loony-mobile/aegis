import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStatus, Indexer} from '../types';
import {STYLES} from '../styles';
import {useTheme} from '../context/AppProvider';

export default function Profile(props: any) {
  const {setAuthContext} = props.route.params.authContext;
  const appTheme = useTheme();
  const theme: Indexer = STYLES[appTheme];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('AUTH_TOKEN_EXPIRY');
    setAuthContext({
      user: null,
      status: AuthStatus.UNAUTHORIZED,
    });
  };

  return (
    <View style={[styles.container, theme.con]}>
      <TouchableOpacity style={theme.button} onPress={handleLogout}>
        <Text style={theme.btnText}>Sign Out</Text>
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
