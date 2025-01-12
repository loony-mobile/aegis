/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '../context/AppProvider';
import {STYLES} from '../styles';
import {Indexer} from '../types/index';

export default function TextComponent({children, style}: any) {
  const appTheme = useTheme();
  const theme: Indexer = STYLES[appTheme];

  return <Text style={[theme.text, {fontSize: 16}, style]}>{children}</Text>;
}
