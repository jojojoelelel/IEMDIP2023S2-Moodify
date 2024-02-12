import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PlayerControls = ({onPlay, onPause, onNext, onPrev}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} style={styles.controlButton}>
        <Text style={styles.controlText}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlay} style={styles.controlButton}>
        <Text style={styles.controlText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPause} style={styles.controlButton}>
        <Text style={styles.controlText}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.controlButton}>
        <Text style={styles.controlText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 25,
  },
  controlText: {
    color: '#fff',
  },
});

export default PlayerControls;