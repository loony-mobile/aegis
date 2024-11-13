import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {handleError} from '../utils';

import Text from '../components/Text';
import {Auth, Indicator} from '../types';
import {theme} from '../styles';

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

  // Simple email validation
  const validateEmail = (_email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

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
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email');
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

  return (
    <View style={[theme.dark.con, styles.container]}>
      <View style={styles.logoCon}>
        <View style={styles.logo}>
          <Text style={styles.title}>Aegis</Text>
        </View>
      </View>

      {appError ? <Text style={styles.error}>{appError}</Text> : null}

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loadingIndicator === Indicator.LOADING ? (
          <ActivityIndicator color="#2d2d2d" size="large" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccount} onPress={handleSignup}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoCon: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
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
  createAccount: {
    marginTop: 20,
  },
  createAccountText: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
