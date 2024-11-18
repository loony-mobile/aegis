import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface TextInputProps {
  value: string;
  onChangeText: (_: any) => Promise<void> | void;
  placeholder: string;
}

export default function TextInputComponent({
  value,
  onChangeText,
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
        autoCapitalize="none"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginVertical: 5,
  },
  input: {
    marginLeft: 6,
    height: 46,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#ccc',
    width: '96%',
  },
});
