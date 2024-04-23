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
  ArtistTitleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
  ArtistTitleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
  }
});

export default artistItem;
