/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

export default function CardComponent({children, style, onPress}: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {padding: 10, justifyContent: 'center', alignItems: 'center'},
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
