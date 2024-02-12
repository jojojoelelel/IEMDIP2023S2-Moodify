/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import PlaylistItem from './PlaylistItem'
import MusicPlayerBar from './src/components/MusicPlayerBar'; //Testing music player bar component

const Tab = createMaterialTopTabNavigator(); // Corrected this line

function PlaylistsScreen() {
  const playlists = [
    {
      id: '1',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '2',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '3',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '4',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '5',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '6',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '7',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    {
      id: '8',
      title: 'Chill Hits',
      creator: 'Spotify',
      imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
    },
    // Add more playlists here...
  ];

  return (
    <FlatList
      data={playlists}
      renderItem={({ item }) => (
        <PlaylistItem
          title={item.title}
          creator={item.creator}
          imageUrl={item.imageUrl}
        />
      )}
      keyExtractor={item => item.id}
      style={styles.listContainer}
    />
  );
}

function ArtistsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Artists</Text>
    </View>
  );
}

function AlbumsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Albums</Text>
    </View>
  );
}



export default function App() {
  // Dummy song data for demonstration
  const currentSong = {
    songTitle: "Song Title",
    artistName: "Artist Name",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png", // Replace with your image URL
  };
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Spotify Library</Text>
    </View>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Playlists" component={PlaylistsScreen} />
        <Tab.Screen name="Artists" component={ArtistsScreen} />
        <Tab.Screen name="Albums" component={AlbumsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    {/* Add the MusicPlayerBar component here and pass the current song data as props */}
    <MusicPlayerBar
      songTitle={currentSong.songTitle}
      artistName={currentSong.artistName}
      coverImage={currentSong.coverImage}
      onPlayPausePress={() => {}} // Need to implement this functionality
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
  },
  header: {
    height: 60,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Slight border for the header
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold', // Spotify uses bold fonts for headers
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
});
