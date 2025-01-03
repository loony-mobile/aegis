import React from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TextInputIconProps {
  value: string;
  onChangeText: (_: any) => Promise<void> | void;
  onIconPress?: () => Promise<void> | void;
  secureTextEntry: boolean;
  placeholder: string;
  theme?: any;
}

export default function TextInputIcon({
  value,
  onChangeText,
  onIconPress,
  secureTextEntry,
  placeholder,
  theme,
}: TextInputIconProps) {
  return (
    <View style={[theme.textInputCon, styles.inputContainer]}>
      <TextInput
        placeholderTextColor="#ccc"
        style={theme.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
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
  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
