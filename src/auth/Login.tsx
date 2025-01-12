/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import TextInputIcon from '../components/TextInputIcon';
import TextInput from '../components/TextInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {handleError} from '../utils';
import Text from '../components/Text';
import {Indicator, AuthStatus, Indexer} from '../types';
import {STYLES, styles} from '../styles';
import Button from '../components/Button';
import {useTheme} from '../context/AppProvider';

const rnBiometrics = new ReactNativeBiometrics();
const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

function Login({
  setComponentState,
  authContext,
  appContext,
}: any): React.JSX.Element {
  const appTheme = useTheme();
  const {setAuthContext} = authContext;

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(Indicator.IDLE);
  const [appError, setAppError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleBiometricAuthentication = (user: any) => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Authenticate with Biometrics',
      })
      .then(async result => {
        const {success} = result;
        if (success && user) {
          await AsyncStorage.setItem(
            'AUTH_TOKEN_EXPIRY',
            expiryTime.toString(),
          );
          setAuthContext({
            status: AuthStatus.AUTHORIZED,
            user: user && JSON.parse(user),
          });
        } else {
          Alert.alert('Biometric Authentication failed');
        }
      })
      .catch(() => {
        Alert.alert('Biometric authentication failed or was canceled');
      });
  };

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('AUTH_USER');
      const authSession = await AsyncStorage.getItem('AUTH_TOKEN_EXPIRY');
      if (!user && !authSession) {
        return;
      }
      if (!authSession && user) {
        rnBiometrics
          .isSensorAvailable()
          .then(result => {
            const {available, biometryType} = result;
            if (
              available &&
              (biometryType === BiometryTypes.Biometrics ||
                biometryType === BiometryTypes.TouchID ||
                biometryType === BiometryTypes.FaceID)
            ) {
              handleBiometricAuthentication(user);
            } else {
              Alert.alert(
                'Biometric authentication is not available on this device.',
              );
            }
          })
          .catch(() => {});
      }
    })();
  }, []);

  const handleLogin = async () => {
    const {email, password} = loginState;
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
        let url = `${appContext.base_url}/auth/login`;
        axios
          .post(url, {email, password})
          .then(async ({data}) => {
            await AsyncStorage.setItem('AUTH_USER', JSON.stringify(data));
            await AsyncStorage.setItem(
              'AUTH_TOKEN_EXPIRY',
              expiryTime.toString(),
            );
            setAuthContext({
              status: AuthStatus.AUTHORIZED,
              user: data,
            });
            setLoadingIndicator(Indicator.IDLE);
          })
          .catch(e => {
            handleError(e, setAppError);
            setLoadingIndicator(Indicator.IDLE);
          });
      } catch (error) {
        setLoadingIndicator(Indicator.IDLE);
      }
    } else {
      setLoadingIndicator(Indicator.IDLE);
    }
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const setEmail = (value: string) => {
    setLoginState({
      ...loginState,
      email: value,
    });
  };

  const setPassword = (value: string) => {
    setLoginState({
      ...loginState,
      password: value,
    });
  };

  const loginWithPin = () => {
    if (authContext.user) {
      setComponentState('LOGIN_PIN');
    }
  };

  const theme: Indexer = STYLES[appTheme];

  return (
    <View style={[theme.con, styles.container]}>
      <View style={styles.logoCon}>
        <View style={styles.logo}>
          <Text style={styles.title}>Aegis</Text>
          <Text>Safe space to store login</Text>
          <Text>credentials.</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        {appError ? (
          <View>
            <Text style={theme.error}>{appError}</Text>
          </View>
        ) : null}
        <TextInput
          placeholder="Email"
          value={loginState.email}
          onChangeText={setEmail}
          theme={theme}
        />
        {emailError ? <Text style={theme.error}>{emailError}</Text> : null}

        <TextInputIcon
          value={loginState.password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          onIconPress={onIconPress}
          placeholder="Password"
          theme={theme}
        />
        {passwordError ? (
          <Text style={theme.error}>{passwordError}</Text>
        ) : null}

        <Button
          text="Login"
          onPress={handleLogin}
          loadingIndicator={loadingIndicator}
          theme={theme}
        />
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsInnderCon}>
          <TouchableOpacity onPress={loginWithPin}>
            <View style={styles.loginWithPinCon}>
              <Text style={styles.loginWith}>Login with </Text>
              <Text style={styles.withPin}>pin?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setComponentState('SIGNUP')}>
            <View>
              <Text style={styles.createAccountText}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
