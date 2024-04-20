//Component for list of track
import React, {useContext} from 'react';
import {View, Image, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';

import {AppContext} from '../navigation/AppNavigation.js';

const TrackItem = ({title, artist, cover, onPress, url, dateAdded}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  // Convert dateAdded to Date object
  const addedDate = new Date(dateAdded);

  //Format the date string
  const formattedDate = addedDate.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={{ uri: cover }} style={styles.coverImage} />
    <View style={styles.textContainer}>
      <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>{title}</Text>
      <Text style={colorTheme === 'Dark' ? styles.artistDark : styles.artistLight}>{artist}</Text>
      <Text style={colorTheme === 'Dark' ? styles.dateDark : styles.dateLight}>{formattedDate}</Text>
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
  titleDark: {
    color: '#FFF',
    textAlign: 'left',
    fontWeight: 'bold',
    // Add additional styling
  },
  titleLight: {
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold',
    // Add additional styling
  },
  artistDark: {
    color: '#aaa',
    textAlign: 'left',
    // Add additional styling
  },
  artistLight: {
    color: '#000',
    textAlign: 'left',
    // Add additional styling
  },
  dateDark: {
     color: '#aaa',
     fontSize: 12,
     // Add additional styling
  },
  dateLight: {
    color: '#878787',
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