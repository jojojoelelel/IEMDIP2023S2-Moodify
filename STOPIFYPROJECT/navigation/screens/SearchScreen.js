// SearchScreen.js

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function SearchScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Search screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});