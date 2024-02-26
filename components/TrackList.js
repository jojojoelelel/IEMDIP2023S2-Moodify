//Component for list of track
import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';

const TrackItem = ({title, artist, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
      {/* Include an icon or button for more options (e.g., the three dots) */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // Add additional styling
  },
  title: {
    color: '#FFF',
    // Add additional styling
  },
  artist: {
    color: '#aaa',
    // Add additional styling
  },
  // Add styles for the options button/icon
});

export default TrackItem;