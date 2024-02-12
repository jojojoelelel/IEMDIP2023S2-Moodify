// HomeScreen.js
import * as React from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

// components
import AlbumCard from '../../components/AlbumCard.js';
import TrackList from '../../components/TrackList';
import PlayerControls from '../../components/PlayerControls';
import SearchScreen from '../screens/SearchScreen';

export default function HomeScreen({ navigation }) {
  // Example data - replace with real data
  const albums = [
    { id: 1, title: 'Album 1', artist: 'Artist 1', cover: 'cover_url_1' },
    { id: 2, title: 'Album 2', artist: 'Artist 2', cover: 'cover_url_2' },
    { id: 3, title: 'Album 3', artist: 'Artist 3', cover: 'cover_url_3' },

    // Add more albums
  ];

  const tracks = [
    { id: 1, title: 'Track 1', artist: 'Artist 1', duration: '2:30' },
    // Add more tracks
  ];

    const handleSearchPress = () => {
      // Navigate to the Search screen using navigation prop
      navigation.navigate('SearchScreen');
    };

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={styles.text}>Moodify</Text>
        <TouchableOpacity onPress={handleSearchPress} style={styles.searchIconContainer}>
          <Ionicons name="search" size={24} color="#fff" style={styles.searchIcon} />
        </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>New Albums</Text>
        <View style={styles.albumContainer}>
          {albums.map(album => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </View>

        <Text style={styles.header}>Geez Weekly</Text>

        <Text style={styles.header}>Recently Played</Text>
        <TrackList data={tracks} />

          <PlayerControls
                    onPrevious={() => {
                      /* Handle previous */
                    }}
                    onPlayPause={() => {
                      /* Handle play/pause */
                    }}
                    onNext={() => {
                      /* Handle next */
                    }}
                  />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
  },
  headerContainer: {
      flexDirection: 'row',
      alignItems: 'center', // Align items vertically
      paddingRight: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchIconContainer: {
    marginLeft: 'auto', // Push the icon to the right
  },
  searchIcon: {
    marginLeft: 230,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight:'bold',
    padding: 20,
  },
  albumContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  }
});






