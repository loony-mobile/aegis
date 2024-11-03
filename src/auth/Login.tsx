/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Auth} from '../types';

const rnBiometrics = new ReactNativeBiometrics();

function Login({setComponentState, authContext}: any): React.JSX.Element {
  const {setAuthContext} = authContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
        .catch(error =>
          console.log('Error checking biometric availability: ', error),
        );
    })();
  }, []);

  // Simple email validation
  const validateEmail = (_email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

  const handleLogin = async () => {
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
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };
        const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
        await AsyncStorage.setItem('AUTH_USER', JSON.stringify(user));
        await AsyncStorage.setItem('AUTH_TOKEN_EXPIRY', expiryTime.toString());

        setAuthContext({
          auth: Auth.TRUE,
          user,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSignup = () => {
    setComponentState('SIGNUP');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

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
    backgroundColor: '#007BFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
