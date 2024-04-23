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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1, 
  },
  titleDark: {
    color: '#FFF',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  titleLight: {
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  artistDark: {
    color: '#aaa',
    textAlign: 'left',
  },
  artistLight: {
    color: '#000',
    textAlign: 'left',
  },
  dateDark: {
     color: '#aaa',
     fontSize: 12,
  },
  dateLight: {
    color: '#878787',
    fontSize: 12,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,  
    borderWidth: 1,   
    borderColor: '#cccccc', 
  },
});

export default TrackItem;