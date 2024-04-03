import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const PlayerControls = ({onPlay, onPause, onNext, onPrev}) => {
    const [isPlaying, setIsPlaying] = useState(false);

const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle the play/pause state
};

  return (
    <View style={styles.greenContainer}>
    <Text style={styles.tabText}>Song Title</Text>
      <TouchableOpacity onPress={onPrev} style={styles.controlButton}>
        <Ionicons name="skip-previous" size={20} color="black" style={styles.controlButton} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
        <Ionicons name={isPlaying ? "pause" : "play-arrow"} size={20} color="black" style={styles.controlButtonPlayPause}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.controlButton}>
        <Ionicons name="skip-next" size={20} color="black" style={styles.controlButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  greenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#CBFB5E',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 'auto',
    paddingHorizontal: 30,
  },
  controlButton: {
    padding: 5,
    backgroundColor: '#CBFB5E',
    borderRadius: 20,
    marginLeft: 'auto',
  },
  controlButtonPlayPause: {
    padding: 5,
    backgroundColor: '#CBFB5E',
    borderRadius: 20,
    marginLeft: 'auto',
    borderWidth: 1, // Set border width to 2 pixels
    borderColor: 'black', // Set border color to white

  },
  controlText: {
    color: '#fff',
  },
      tabText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
      },
});

export default PlayerControls;