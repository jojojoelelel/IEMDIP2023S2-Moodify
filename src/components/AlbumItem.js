import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../navigation/AppNavigation';

const albumItem = ({id, title, creator, imageUrl, onPress}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <TouchableOpacity style={colorTheme === 'Dark' ? styles.itemContainerDark : styles.itemContainerLight} onPress={onPress}>
      <Image source={{uri: imageUrl}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={colorTheme === 'Dark' ? styles.AlbumTitleDark : styles.AlbumTitleLight}>{title}</Text>
        <Text style={colorTheme === 'Dark' ? styles.AlbumCreatorDark : styles.AlbumCreatorLight}>{creator}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainerDark: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5, // Subtle separator between items
    borderBottomColor: '#6D6D6D', // Dark separator for a dark theme
    backgroundColor: '#353535', // Background color for each item
  },
  itemContainerLight: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,  // Subtle separator between items
    borderBottomColor: `${process.env.REACT_APP_LIGHTACCENT}`, // Dark separator for a dark theme
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`, // Background color for each item
   },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15, // Increase space between the cover and text
    borderWidth: 1, // Add border around the album cover
    borderColor: '#cccccc', // Set border color for the album cover
  },
  textContainer: {
    justifyContent: 'center',
  },
  AlbumTitleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Light text color for the dark theme
  },
  AlbumTitleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`, // Light text color for the dark theme
  },
  AlbumCreatorDark: {
    fontSize: 14,
    color: '#B3B3B3', // Light grey for secondary text
  },
  AlbumCreatorLight: {
    fontSize: 14,
    color: '#353535',
  }
});

export default albumItem;
