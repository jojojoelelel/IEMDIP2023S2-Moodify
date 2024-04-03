//Component for list of track
import React from 'react';
import {View, Image, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';

const TrackItem = ({title, artist, imageUrl, onPress, dateAdded}) => {
  // Convert dateAdded to Date object
  const addedDate = new Date(dateAdded);

  // Format the date string
  const formattedDate = addedDate.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={{ uri: imageUrl }} style={styles.coverImage} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
       </View>
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
    textAlign: 'left',
    // Add additional styling
  },
  date: {
     color: '#aaa',
     fontSize: 12,
     // Add additional styling
    },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,  // Increase space between the cover and text
    borderWidth: 1,   // Add border around the album cover
    borderColor: '#cccccc', // Set border color for the album cover
  },
  // Add styles for the options button/icon
});

export default TrackItem;