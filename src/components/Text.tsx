import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function TextComponent({children}: any) {
  return <Text style={styles}>{children}</Text>;
}

const styles = StyleSheet.create({
  fontSize: 16,
  color: '#2d2d2d',
});
