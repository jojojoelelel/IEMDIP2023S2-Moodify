import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PLscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default PLscreen;
