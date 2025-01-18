import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Indexer} from '../types';
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

export const STYLES: Indexer = {
  dark: {
    headerStyle: {
      backgroundColor: '#1E1E1E',
    },
    tabBarIconColor: '#cccccc',
    headerTintColor: '#ffffff',
    tabBarActiveTintColor: '#cccccc',
    tabBarInactiveTintColor: '#cccccc',
    textInputCon: {
      backgroundColor: '#121212',
      borderWidth: 1,
      borderColor: '#2d2d2d',
      borderRadius: 10,
    },
    tabBarStyle: {
      backgroundColor: '#1E1E1E',
      borderTopWidth: 0,
    },
    textInput: {
      marginLeft: 6,
      height: 46,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: '#ccc',
      width: '85%',
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
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 5,
    },
    tabBarIconColor: '#2d2d2d',
    headerTintColor: '#2d2d2d',
    tabBarActiveTintColor: '#2d2d2d',
    tabBarInactiveTintColor: '#2d2d2d',
    tabBarStyle: {
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    textInputCon: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
    },
    textInput: {
      marginLeft: 6,
      height: 46,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: '#2d2d2d',
      width: '85%',
    },
    con: {
      backgroundColor: '#ffffff',
    },
    text: {
      color: '#2d2d2d',
    },
    card: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: '96%',
      marginRight: '2%',
      marginLeft: '2%',
      borderRadius: 15,
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
  container: {flex: 1},
  logoCon: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  formContainer: {flex: 5, padding: 12, justifyContent: 'center'},
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
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 14,
    marginBottom: 10,
  },
  optionsInnderCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginWithPinCon: {
    flexDirection: 'row',
  },
  loginWith: {
    color: 'grey',
  },
  withPin: {
    color: 'white',
  },
  createAccountText: {
    color: 'white',
  },
  error: {
    color: 'white',
    marginBottom: 10,
    fontSize: 14,
  },
});
