import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {theme, styles} from '../styles';
import Text from '../components/Text';

function Signup({setComponentState}: any): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async () => {
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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>

      <View style={theme.border} />
      <TouchableOpacity style={styles.createAccount} onPress={handleLogin}>
        <Text style={styles.createAccountText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Signup;
