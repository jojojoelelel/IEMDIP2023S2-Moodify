//Component for list of track
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// const TrackItem = ({title, artist, onPress}) => {
//  return (
//    <TouchableOpacity onPress={onPress} style={styles.container}>
//      <Text style={styles.title}>{title}</Text>
//     <Text style={styles.artist}>{artist}</Text>
//      {/* Include an icon or button for more options (e.g., the three dots) */}
//    </TouchableOpacity>
//  );
//};

const TrackList = ({data}) => (
  <View>
    {data.map(track => (
      <View key={track.id}>
        <Text style={{color: '#fff'}}>{track.name}</Text>
        {/* Render other track details */}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // Add additional styling
  },
  title: {
    color: '#fff',
    // Add additional styling
  },
  artist: {
    color: '#aaa',
    // Add additional styling
  },
  // Add styles for the options button/icon
});

// export default TrackItem;
export default TrackList;
