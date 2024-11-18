import React, {useState, useEffect} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import ButtonTextInput from '../components/ButtonTextInput';
import TextInput from '../components/TextInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {handleError} from '../utils';
import Text from '../components/Text';
import {Auth, Indicator} from '../types';
import {theme, styles} from '../styles';
import Button from '../components/Button';

const rnBiometrics = new ReactNativeBiometrics();
const biometricEnabled = false;

function Login({
  setComponentState,
  authContext,
  appContext,
}: any): React.JSX.Element {
  const {setAuthContext} = authContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(Indicator.IDLE);
  const [appError, setAppError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleBiometricAuthentication = () => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Authenticate with Biometrics',
      })
      .then(result => {
        const {success} = result;
        if (success) {
          Alert.alert('Authentication successful');
        } else {
          Alert.alert('Authentication failed');
        }
      })
      .catch(() => {
        Alert.alert('Biometric authentication failed or was canceled');
      });
  };

  useEffect(() => {
    if (biometricEnabled) {
      (async () => {
        rnBiometrics
          .isSensorAvailable()
          .then(result => {
            const {available, biometryType} = result;
            if (
              available &&
              (biometryType === BiometryTypes.TouchID ||
                biometryType === BiometryTypes.FaceID)
            ) {
              handleBiometricAuthentication();
            } else {
              Alert.alert(
                'Biometric authentication is not available on this device.',
              );
            }
          })
          .catch(() => {});
      })();
    }
  }, []);

  const handleLogin = async () => {
    setLoadingIndicator(Indicator.LOADING);
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      valid = false;
    }

    if (valid) {
      try {
        let url = `${appContext.base_url}/api/auth/login`;
        console.log(url);
        axios
          .post(url, {email, password})
          .then(async ({data}) => {
            const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
            await AsyncStorage.setItem('AUTH_USER', JSON.stringify(data));
            await AsyncStorage.setItem(
              'AUTH_TOKEN_EXPIRY',
              expiryTime.toString(),
            );
            setAuthContext({
              auth: Auth.TRUE,
              user: data,
            });
          })
          .catch(e => handleError(e, setAppError));
        setLoadingIndicator(Indicator.IDLE);
      } catch (error) {
        setLoadingIndicator(Indicator.IDLE);
        console.error(error);
      }
    } else {
      setLoadingIndicator(Indicator.IDLE);
    }
  };

  const handleSignup = () => {
    setComponentState('SIGNUP');
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={[theme.dark.con, styles.container]}>
      <View style={styles.logoCon}>
        <View style={styles.logo}>
          <Text style={styles.title}>Aegis</Text>
          <Text>Safe space to store login</Text>
          <Text>credentials.</Text>
        </View>
      </View>
      {appError ? (
        <View>
          <Icon name="error" size={18} color="red" />
          <Text style={styles.error}>{appError}</Text>
        </View>
      ) : null}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <ButtonTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        onIconPress={onIconPress}
        placeholder="Password"
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Button
        text="Login"
        onPress={handleLogin}
        loadingIndicator={loadingIndicator}
      />
      <View style={theme.border} />
      <TouchableOpacity style={styles.createAccount} onPress={handleSignup}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
