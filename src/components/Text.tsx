/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {theme} from '../styles/index';

export default function TextComponent({children, style}: any) {
  return (
    <Text style={[{color: theme.dark.textColor, fontSize: 16}, style]}>
      {children}
    </Text>
  );
}
