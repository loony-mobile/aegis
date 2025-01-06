# Aegis

## React Native Secure Credentials App

A React Native application designed to securely store user login credentials. The app uses a Rust backend for password encryption, integrated via JNI (Java Native Interface), ensuring a robust and secure solution.

## Features

- **Secure Credential Storage**: Encrypts and stores user passwords.
- **Rust-Powered Encryption**: Leverages the power of Rust for efficient and secure password encryption.
- **JNI Integration**: Seamless integration between Rust and the React Native app via JNI.
- **Cross-Platform**: Works on both Android and iOS platforms.

## Tech Stack

### Frontend:

- **React Native**: For building the mobile application UI and handling user interactions.

### Backend:

- **Rust**: For secure password encryption and decryption.
- **JNI**: To interface between the React Native JavaScript code and the Rust encryption library.

## Security

- **Password Encryption**: All passwords are encrypted using a secure Rust library before being stored.
- **JNI Safety**: Ensures type-safe communication between Rust and JavaScript.
- **Data Privacy**: No credentials are transmitted to external servers; all operations are performed locally.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Rust](https://www.rust-lang.org/)
- [JNI Documentation](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/)

---

Feel free to contribute, suggest improvements, or report issues. Happy coding! 🚀
