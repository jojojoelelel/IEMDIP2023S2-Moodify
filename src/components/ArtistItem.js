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

const artistItem = ({id, title, creator, imageUrl, onPress}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <TouchableOpacity style={colorTheme === 'Dark' ? styles.itemContainerDark : styles.itemContainerLight} onPress={onPress}>
      <Image source={{uri: imageUrl}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={colorTheme === 'Dark' ? styles.ArtistTitleDark : styles.ArtistTitleLight}>{title}</Text>
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
    // borderWidth: 1,
    borderBottomWidth: 1, // Subtle separator between items
    borderBottomColor: '#6D6D6D', // Dark separator for a dark theme
    backgroundColor: '#353535', // Background color for each item
  },
  itemContainerLight: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    // borderWidth: 1,
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
  ArtistTitleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Light text color for the dark theme
  },
  ArtistTitleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`, // Light text color for the dark theme
  }
});

export default artistItem;
