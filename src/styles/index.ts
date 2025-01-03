import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textPlaceholder: '#757575',
  divider: '#282828',
  error: '#CF6679',
  warning: '#F4B400',
  success: '#4CAF50',
  info: '#2196F3',
  disabled: '#555555',
};

const buttonText: StyleProp<TextStyle> = {
  color: '#2d2d2d',
  fontSize: 18,
  textAlign: 'center',
  fontWeight: 'bold',
};

const darkButton: StyleProp<ViewStyle> = {
  height: 50,
  backgroundColor: '#e0e0e0',
  borderRadius: 10,
  marginTop: 10,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

const lightButton: StyleProp<ViewStyle> = {
  ...darkButton,
  backgroundColor: '#e0e0e0',
};

export const STYLES = {
  dark: {
    textInputCon: {
      backgroundColor: '#121212',
    },
    con: {
      backgroundColor: '#121212',
    },
    text: {
      color: '#cccccc',
    },
    card: {
      backgroundColor: '#1E1E1E',
    },
    button: darkButton,
    btnDelete: {
      height: 50,
      backgroundColor: '#1E1E1E',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    btnDeleteText: {
      color: '#ffffff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    btnText: buttonText,
    error: {
      color: 'white',
      marginBottom: 10,
      fontSize: 14,
    },
  },
  light: {
    textInputCon: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
    },
    con: {
      backgroundColor: '#ffffff',
    },
    text: {
      color: '#2d2d2d',
    },
    card: {
      backgroundColor: '#ccc',
    },
    button: lightButton,
    btnDelete: {
      height: 50,
      backgroundColor: '#1E1E1E',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    btnDeleteText: {
      color: '#ffffff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    btnText: buttonText,
    error: {
      color: 'black',
      marginBottom: 10,
      fontSize: 14,
    },
  },
  border: {
    marginTop: 24,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
};

export const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
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
    fontSize: 32,
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
  createAccount: {
    marginTop: 5,
  },
  createAccountText: {
    textAlign: 'center',
  },
  error: {
    color: 'white',
    marginBottom: 10,
    fontSize: 14,
  },
});
