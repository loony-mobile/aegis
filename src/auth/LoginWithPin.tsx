/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import TextInputIcon from '../components/TextInputIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {handleError} from '../utils';
import Text from '../components/Text';
import {Indicator, AuthStatus} from '../types';
import {STYLES, styles} from '../styles';
import Button from '../components/Button';
import {useTheme} from '../context/AppProvider';

const rnBiometrics = new ReactNativeBiometrics();
const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

function LoginWithPin({
  setComponentState,
  authContext,
  appContext,
  userSession,
}: any): React.JSX.Element {
  const appTheme = useTheme();
  const {setAuthContext} = authContext;

  const [loginState, setLoginState] = useState({
    login_pin: '',
  });
  const [loginPinError, setLoginPinError] = useState('');
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
    const {login_pin} = loginState;
    setLoadingIndicator(Indicator.LOADING);
    let valid = true;

    // Validate password
    if (!login_pin) {
      setLoginPinError('Log in pin is required');
      valid = false;
    } else if (login_pin.length < 6) {
      setLoginPinError('Log in pin should be at least 6 characters');
      valid = false;
    }

    if (valid) {
      try {
        let url = `${appContext.base_url}/auth/login_pin`;
        axios
          .post(url, {email: userSession.email, login_pin})
          .then(async ({data}) => {
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

  const setPassword = (value: string) => {
    setLoginState({
      ...loginState,
      login_pin: value,
    });
  };
  const theme = STYLES[appTheme];

  return (
    <View style={[theme.con, styles.container]}>
      <View style={innerStyles.welcomeCon}>
        <Text style={innerStyles.welcomeText}>Hi {userSession.fname}</Text>
        <Text>Welcome back</Text>
      </View>
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

        <TextInputIcon
          value={loginState.login_pin}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          onIconPress={onIconPress}
          placeholder="Login Pin"
          keyboardType="number-pad"
          theme={theme}
        />
        {loginPinError ? (
          <Text style={theme.error}>{loginPinError}</Text>
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
          <TouchableOpacity onPress={() => setComponentState('LOGIN_PASSWORD')}>
            <View style={styles.loginWithPinCon}>
              <Text style={styles.loginWith}>Login with </Text>
              <Text style={styles.withPin}>password?</Text>
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

export default LoginWithPin;

const innerStyles = {
  welcomeCon: {
    padding: 14,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
