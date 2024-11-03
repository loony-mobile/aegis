import React from 'react';
import {Text, View} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
