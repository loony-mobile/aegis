import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from '../components/Text';
import {Indicator} from '../types';
import {styles, theme} from '../styles';

export default function Button({text, loadingIndicator, onPress}: ButtonProps) {
  return (
    <TouchableOpacity style={theme.dark.button} onPress={onPress}>
      {loadingIndicator && loadingIndicator === Indicator.LOADING ? (
        <ActivityIndicator color="#2d2d2d" size="large" />
      ) : (
        <Text style={theme.dark.btnText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export function DeleteButton({text, loadingIndicator, onPress}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[theme.dark.btnDelete, styles.boxShadow]}
      onPress={onPress}>
      {loadingIndicator && loadingIndicator === Indicator.LOADING ? (
        <ActivityIndicator color="#2d2d2d" size="large" />
      ) : (
        <Text style={theme.dark.btnDeleteText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

interface ButtonProps {
  onPress: () => Promise<void> | void;
  text: string;
  loadingIndicator?: Indicator;
}
