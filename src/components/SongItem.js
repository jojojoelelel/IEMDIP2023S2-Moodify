// SongItem.js
import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import {MusicPlayerContext} from '../contexts/SongContext';

const SongItem = ({id, title, artist, cover, preview_url}) => {
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

  // Function to play the song preview [OLD]
  /* const playPreview = () => {
    const song = new Sound(preview_url, null, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound
      song.play(success => {
        if (!success) {
          console.log('Playback failed due to audio decoding errors');
        }
        // Release the audio player resource once the song is finished
        song.release();
      });
    });
  }; */

  // NEW RETURN STATEMENT WITH MUSICPLAYERCONTEXT
  return (
    <TouchableOpacity style={styles.songContainer} onPress={handlePress}>
      <Image source={{uri: cover}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color="#ffffff" />
    </TouchableOpacity>
  );

  // OLD RETURN STATEMENT
  /* return (
    <TouchableOpacity style={styles.songContainer} onPress={playPreview}>
      <Image source={{uri: cover}} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color="#ffffff" />
    </TouchableOpacity>
  ); */
};

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // You can adjust the borderRadius to your preference
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  // Add any additional styles you need
});

export default SongItem;
