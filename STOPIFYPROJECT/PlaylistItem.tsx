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
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,  // Add border between items
    borderBottomColor: '#cccccc', // Set border color
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  },
  playlistCreator: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaylistItem;
