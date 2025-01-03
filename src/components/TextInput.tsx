import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface TextInputProps {
  value: string;
  onChangeText: (_: any) => Promise<void> | void;
  placeholder: string;
  theme?: any;
}

export default function TextInputComponent({
  value,
  onChangeText,
  placeholder,
  theme,
}: TextInputProps) {
  return (
    <View style={[theme.textInputCon, styles.inputContainer]}>
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
