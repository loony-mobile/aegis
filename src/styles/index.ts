import {
    StyleSheet,
  } from 'react-native';

export const theme = {
    dark: {
        con: {
            backgroundColor: '#323436',
        },
        text: {
            color: '#cccccc',
        },
        card: {
            backgroundColor: '#363636',
        },
    },
    light: {
        con: {
            backgroundColor: '#fff',
        },
        text: {
            color: '#2d2d2d',
        },
        card: {
            backgroundColor: '#ccc',
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
    button: {
      height: 50,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      fontWeight: 'bold',
    },
    button_delete: {
      height: 50,
      backgroundColor: 'transparent',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      fontWeight: 'bold',
    },
    button_delete_text: {
      color: '#ffffff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    text: {
      color: '#2d2d2d',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
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
