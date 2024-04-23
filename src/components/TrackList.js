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
  },
  containerLight: {
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
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  artistDark: {
    color: '#aaa',
  },
  artistLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
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
