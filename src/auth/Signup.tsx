import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {theme, styles} from '../styles';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import ButtonTextInput from '../components/ButtonTextInput';

function Signup({setComponentState}: any): React.JSX.Element {
  const [signupState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignup = async () => {
    const {email, password} = signupState;
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
        setComponentState('LOGIN');
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

  const handleLogin = () => {
    setComponentState('LOGIN');
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

  const setPassword = (value: string) => {
    setLoginState({
      ...signupState,
      password: value,
    });
  };

  return (
    <View style={[styles.container, theme.dark.con]}>
      <View style={styles.logoCon}>
        <View style={styles.logo}>
          <Text style={styles.title}>Aegis</Text>
          <Text>Safe space to store login</Text>
          <Text>credentials.</Text>
        </View>
      </View>

      <TextInput
        placeholder="Email"
        value={signupState.email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <ButtonTextInput
        value={signupState.password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        onIconPress={onIconPress}
        placeholder="Password"
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <TouchableOpacity style={[theme.dark.button]} onPress={handleSignup}>
        <Text style={[theme.dark.button_text]}>Signup</Text>
      </TouchableOpacity>

      <View style={theme.border} />
      <TouchableOpacity style={styles.createAccount} onPress={handleLogin}>
        <Text style={styles.createAccountText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Signup;
