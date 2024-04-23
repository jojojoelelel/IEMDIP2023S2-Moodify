// SongItem.js
import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import {MusicPlayerContext} from '../contexts/SongContext';
import {AppContext} from '../navigation/AppNavigation';

const SongItem = ({id, title, artist, cover, preview_url}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const {playTrack, playOrPauseTrack, currentTrack} =
    useContext(MusicPlayerContext);

  const handlePress = () => {
    const track2 = {
      id: id,
      url: preview_url,
      title: title,
      artist: artist,
      cover: cover,
    };

    playTrack(track2);
  };

  // MUSICPLAYERCONTEXT
  return (
    <TouchableOpacity style={colorTheme === 'Dark' ? styles.songContainerDark : styles.songContainerLight} onPress={handlePress}>
      <Image source={{uri: cover}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={colorTheme === 'Dark' ? styles.songTitleDark : styles.songTitleLight}>{title}</Text>
        <Text style={colorTheme === 'Dark' ? styles.artistNameDark : styles.artistNameLight}>{artist}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color={colorTheme === 'Dark' ? '#fff' : `${process.env.REACT_APP_DARKTHEME}`} />
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  songContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: '#303030',
    // borderWidth: 1,
    // borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  songContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#303030',
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitleDark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songTitleLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistNameDark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  artistNameLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 14,
  },
});

export default SongItem;
