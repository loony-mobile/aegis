import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {STYLES, styles} from '../styles';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import TextInputIcon from '../components/TextInputIcon';
import axios from 'axios';
import {useTheme} from '../context/AppProvider';
import Button from '../components/Button';
import {Indicator, Indexer} from '../types';

function Signup({
  setComponentState,
  appContext,
  authContext,
}: any): React.JSX.Element {
  const appTheme = useTheme();
  const theme: Indexer = STYLES[appTheme];

  const [signupState, setLoginState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    login_pin: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginPinError, setLoginPinError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loadingIndicator, setLoadingIndicator] = useState(Indicator.IDLE);

  const handleSignup = async () => {
    setLoadingIndicator(Indicator.LOADING);
    const {email, password, firstname, lastname, login_pin} = signupState;
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

    if (!login_pin) {
      setLoginPinError('Login Pin Error is required');
      valid = false;
    }

    if (valid) {
      try {
        let url = `${appContext.base_url}/auth/signup`;
        const formData = {
          fname: firstname,
          lname: lastname,
          email,
          password,
          login_pin,
        };
        axios
          .post(url, formData)
          .then(() => {
            setLoadingIndicator(Indicator.IDLE);
            setComponentState('LOGIN_PASSWORD');
          })
          .catch(e => {
            setLoadingIndicator(Indicator.IDLE);
            console.log('error', e.response);
          });
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      }
    }
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const setEmail = (value: string) => {
    setLoginState({
      ...signupState,
      email: value,
    });
  };
  const setFirstname = (value: string) => {
    setLoginState({
      ...signupState,
      firstname: value,
    });
  };
  const setLastname = (value: string) => {
    setLoginState({
      ...signupState,
      lastname: value,
    });
  };

  const setPassword = (value: string) => {
    setLoginState({
      ...signupState,
      password: value,
    });
  };

  const setLoginPin = (value: string) => {
    setLoginState({
      ...signupState,
      login_pin: value,
    });
  };

  const loginWithPin = () => {
    if (authContext.user) {
      setComponentState('LOGIN_PIN');
    }
  };

  return (
    <View style={[styles.container, theme.con]}>
      <View style={styles.logoCon}>
        <View style={styles.logo}>
          <Text style={styles.title}>Aegis</Text>
          <Text>Safe space to store login</Text>
          <Text>credentials.</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="First name"
          value={signupState.firstname}
          onChangeText={setFirstname}
          theme={theme}
        />

        <TextInput
          placeholder="Last name"
          value={signupState.lastname}
          onChangeText={setLastname}
          theme={theme}
        />

        <TextInput
          placeholder="Email"
          value={signupState.email}
          onChangeText={setEmail}
          theme={theme}
        />
        {emailError ? <Text style={theme.error}>{emailError}</Text> : null}

        <TextInputIcon
          value={signupState.password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          onIconPress={onIconPress}
          placeholder="Password"
          theme={theme}
        />
        {passwordError ? (
          <Text style={theme.error}>{passwordError}</Text>
        ) : null}

        <TextInputIcon
          value={signupState.login_pin}
          onChangeText={setLoginPin}
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
          text="Sign Up"
          onPress={handleSignup}
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
          <TouchableOpacity onPress={loginWithPin}>
            <View style={styles.loginWithPinCon}>
              <Text style={styles.loginWith}>Login with </Text>
              <Text style={styles.withPin}>pin?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Signup;
