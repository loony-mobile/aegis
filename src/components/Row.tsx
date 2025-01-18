import React from 'react';
import {View} from 'react-native';

export const Row = ({children}: any) => {
  return <View style={style}>{children}</View>;
};

const style: any = {
  flexDirection: 'row', // Arrange items in a row
  justifyContent: 'space-around', // Space items evenly across the row
  alignItems: 'center', // Align items in the center vertically
  padding: 10,
  backgroundColor: '#2d2d2d',
};
