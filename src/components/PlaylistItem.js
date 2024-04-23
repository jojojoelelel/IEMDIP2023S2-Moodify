// PlaylistItem.tsx
import React, {useContext} from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppContext } from '../navigation/AppNavigation';

const PlaylistItem = ({ title, creator, imageUrl, onPress }) => {
  const { colorTheme, setColorTheme } = useContext(AppContext);  
  return (
      <TouchableOpacity style={colorTheme === 'Dark' ? styles.itemContainerDark : styles.itemContainerLight} onPress={onPress}>
        <Image source={{ uri: imageUrl }} style={styles.coverImage} />
        <View style={styles.textContainer}>
          <Text style={colorTheme === 'Dark' ? styles.playlistTitleDark : styles.playlistTitleLight}>{title}</Text>
          <Text style={colorTheme === 'Dark' ? styles.playlistCreatorDark : styles.playlistCreatorLight}>{creator}</Text>
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
   borderBottomWidth: 1,  
   borderBottomColor: '#6D6D6D', 
   backgroundColor: '#353535', 
  },
  itemContainerLight: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`, 
   },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15, 
    borderWidth: 1,  
    borderColor: '#cccccc', 
  },
  textContainer: {
    justifyContent: 'center',
  },
  playlistTitleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
  playlistTitleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`, 
  },
  playlistCreatorDark: {
    fontSize: 14,
    color: '#B3B3B3', 
  },
  playlistCreatorLight: {
    fontSize: 14,
    color: '#353535',
  }
});

export default PlaylistItem;
