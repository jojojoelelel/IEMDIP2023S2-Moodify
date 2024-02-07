/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
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
  Flatlist
} from 'react-native';

import PlaylistItem from './PlaylistItem'

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
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
});
