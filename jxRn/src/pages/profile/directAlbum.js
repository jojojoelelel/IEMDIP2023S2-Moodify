import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ABScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AB</Text>
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

export default ABScreen;
