// PlaylistItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const PlaylistItem = ({ title, creator, imageUrl }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUrl }} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <Text style={styles.playlistCreator}>{creator}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
   // flexDirection: 'row',
   // padding: 10,
   // alignItems: 'center',
   // borderBottomWidth: 1,  // Add border between items
   // borderBottomColor: '#cccccc', // Set border color
   flexDirection: 'row',
   paddingVertical: 10,
   paddingHorizontal: 15,
   alignItems: 'center',
   borderBottomWidth: 0.5,  // Subtle separator between items
   borderBottomColor: '#6D6D6D', // Dark separator for a dark theme
   backgroundColor: '#353535', // Background color for each item
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,  // Increase space between the cover and text
    borderWidth: 1,   // Add border around the album cover
    borderColor: '#cccccc', // Set border color for the album cover
  },
  textContainer: {
    justifyContent: 'center',
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Light text color for the dark theme
  },
  playlistCreator: {
    fontSize: 14,
    color: '#B3B3B3', // Light grey for secondary text
  },
});

export default PlaylistItem;
