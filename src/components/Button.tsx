import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from '../components/Text';
import {Indicator} from '../types';
import {styles} from '../styles';

export default function Button({text, loadingIndicator, onPress}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loadingIndicator && loadingIndicator === Indicator.LOADING ? (
        <ActivityIndicator color="#2d2d2d" size="large" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

interface ButtonProps {
  onPress: () => Promise<void> | void;
  text: string;
  loadingIndicator?: Indicator;
}
