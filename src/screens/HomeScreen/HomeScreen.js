// src/screens/HomeScreen/HomeScreen.js
import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AlbumCard from '../../components/AlbumCard';
import TrackList from '../../components/TrackList';
import SearchScreen from './SearchScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
//import BottomNavigation from '../../navigation/BottomNavigation';
//Remove import of BottomNavigation

export default function HomeScreen({navigation}) {
  // Example data - replace with real data to be added by backend
  const albums = [
    {id: 1, title: 'Album 1', artist: 'Artist 1', cover: 'cover_url_1'},
    {id: 2, title: 'Album 2', artist: 'Artist 2', cover: 'cover_url_2'},
    {id: 3, title: 'Album 3', artist: 'Artist 3', cover: 'cover_url_3'},
    // Add more albums
  ];

  const tracks = [
    {id: 1, title: 'Track 1', artist: 'Artist 1', duration: '2:30'},
    {id: 2, title: 'Track 2', artist: 'Artist 2', duration: '2:30'},
    {id: 3, title: 'Track 3', artist: 'Artist 3', duration: '2:30'},
    // Add more tracks
  ];

  const handleSearchPress = () => {
    // Need to navigate to the Search screen properly
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          onPress={() => alert('This is the "Home" screen.')}
          style={styles.text}>
          Moodify
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.searchIconContainer}>
          <Ionicons
            name="search"
            size={24}
            color="#fff"
            style={styles.searchIcon}
          />
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
        <View style={styles.trackContainer}>
          {tracks.map(tracks => (
            <TrackList data={tracks} {...tracks} />
          ))}
        </View>
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
    fontWeight: 'bold',
    padding: 20,
  },
  albumContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  trackContainer: {
    width: '95%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: '5%',
    padding: 12,
    elevation: 5,
    borderRadius: 10,
    shadowColor: '#303133',
    flexDirection: 'column',
  },
});
