import React from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TextInputProps {
  value: string;
  onChangeText: (_: any) => Promise<void> | void;
  onIconPress?: () => Promise<void> | void;
  secureTextEntry: boolean;
  placeholder: string;
}

export default function TextInputComponent({
  value,
  onChangeText,
  onIconPress,
  secureTextEntry,
  placeholder,
}: TextInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholderTextColor="#ccc"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="password"
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
      <View style={styles.border} />
      <TouchableOpacity onPress={onIconPress} style={styles.button}>
        <Icon name="eye" size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#8d8d8d',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  input: {
    marginLeft: 6,
    height: 46,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#ccc',
    width: '85%',
  },
  border: {
    marginTop: 5,
    height: 40,
    borderColor: '#8d8d8d',
    borderLeftWidth: 0.5,
  },
  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});