//Component for list of track
import React, {useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

import {AppContext} from '../navigation/AppNavigation.js';

const TrackItem = ({id, title, artist, cover, url, onPress}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <TouchableOpacity onPress={onPress} style={colorTheme === 'Dark' ? styles.containerDark : styles.containerLight}>
      <Image source={{uri: cover}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>{title}</Text>
        <Text style={colorTheme === 'Dark' ? styles.artistDark : styles.artistLight}>{artist}</Text>
      </View>
      {/* Include an icon or button for more options (e.g., the three dots) */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // Add additional styling
  },
  containerLight: {
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
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'left',
    fontWeight: 'bold',
    // Add additional styling
  },
  artistDark: {
    color: '#aaa',
    // Add additional styling
  },
  artistLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
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

export default TrackItem;
