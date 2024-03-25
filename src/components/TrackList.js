//Component for list of track
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

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
  textContainer: {
    flex: 1, // Take up remaining space to allow text to align to the left
  },
  title: {
    color: '#FFF',
    textAlign: 'left',
    // Add additional styling
  },
  artist: {
    color: '#aaa',
    // Add additional styling
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15, // Increase space between the cover and text
    borderWidth: 1, // Add border around the album cover
    borderColor: '#cccccc', // Set border color for the album cover
  },
  // Add styles for the options button/icon
});

// export default TrackItem;
export default TrackList;
