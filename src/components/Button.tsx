import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from '../components/Text';
import {Indicator} from '../types';
import {styles} from '../styles';

export default function Button({
  text,
  loadingIndicator,
  onPress,
  theme,
}: ButtonProps) {
  return (
    <TouchableOpacity style={theme.button} onPress={onPress}>
      {loadingIndicator && loadingIndicator === Indicator.LOADING ? (
        <ActivityIndicator color="#2d2d2d" size="large" />
      ) : (
        <Text style={theme.btnText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export function DeleteButton({
  text,
  loadingIndicator,
  onPress,
  theme,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[theme.btnDelete, styles.boxShadow]}
      onPress={onPress}>
      {loadingIndicator && loadingIndicator === Indicator.LOADING ? (
        <ActivityIndicator color="#2d2d2d" size="large" />
      ) : (
        <Text style={theme.btnDeleteText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

interface ButtonProps {
  onPress: () => Promise<void> | void;
  text: string;
  loadingIndicator?: Indicator;
  theme?: any;
}
