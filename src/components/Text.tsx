/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {theme} from '../styles/index';

export default function TextComponent({children, style}: any) {
  return (
    <Text style={[theme.dark.text, {fontSize: 16}, style]}>{children}</Text>
  );
}
