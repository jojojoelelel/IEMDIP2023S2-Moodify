// HomeScreen.js
import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from '../../navigation/BottomNavigation.js';

// For API calls
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../AccountScreen/AuthContext';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api'
import { updatePassword } from 'firebase/auth';
import {access_token} from '@env';

// Other screens in Home
import SearchScreen from './SearchScreen';


// components
import ArtistCard from '../../components/ArtistCard.js';
import AlbumCard from '../../components/AlbumCard.js';
import TrackList from '../../components/TrackList.js';
import PlayerControls from '../../components/PlayerControls.js';
import MusicPlayerBar from '../../components/MusicPlayerBar.js';


export default function HomeScreen({ navigation }) {
// Example data - replace with real data to be added by backend

  const albums = [
     { id: 1, title: 'Album 1', artist: 'Artist 1', cover: '' },
     { id: 2, title: 'Album 2', artist: 'Artist 2', cover: 'cover_url_2' },
     { id: 3, title: 'Album 3', artist: 'Artist 3', cover: 'cover_url_3' },
// Add more albums
             ];
  const [topArtists, setTopArtists] = useState([]);

  const tracks = [
      { id: 1, title: 'Track 1', artist: 'Artist 1', duration: '2:30' },
      { id: 2, title: 'Track 2', artist: 'Artist 2', duration: '2:30' },
      { id: 3, title: 'Track 3', artist: 'Artist 3', duration: '2:30' },
               // Add more tracks
             ];

const handleSearchPress = () => {
// Need to navigate to the Search screen properly
   navigation.navigate('Search');
};

 const spotifyApi = new SpotifyWebApi();
 const access_token = 'BQBgL7b4Sga1BhTu_Og7LBO7tG8Qo7RZT1OouUtm3D9xa_sX_8RK-EAMU9Pk4NV_X7wIM1H9ho4AeJhrVwvtM0xJUoOWff3fXvSrnZ06CDz9W6BFIAf-nwsBIYs4cSEqKqAiB6PMrSTQv2KVhBFQU99OaKqs-9WzzPhOFexSiqqSbX9gNnq080x9vr8Uq-TBChudRPF49xG9z1nqhOmiRb43dS4AamaRsAlS_xEnFMfW2JHGJTiRes3LUC_Z'; // Replace with your actual access token

const getFollowedArtist2 = async () => {
    try {
        const response = await SpotifyAPI.getFollowedArtists(access_token, 5);
        //console.log('Response:', response); // Log the response object
        setTopArtists(response.artists.items);

    } catch (error) {
        console.error('Error in getFollowedArtists => ', error)
    }
};

useEffect(() => {
  getFollowedArtist2();
}, []);
console.log(topArtists);

/* const getArtistAlbums2 = async () => {
  try {
    const response = await SpotifyAPI.getArtistAlbums(access_token, '1hGdQOfaZ5saQ6JWVuxVDZ');
    console.log('Artist albums:', response);
  } catch (error) {
    console.error('Error in getArtistAlbums => ', error);
  }
};

useEffect(() => {
  getArtistAlbums2();
}, []);

const getArtistTopTracks2 = async () => {
  try {
    const response = await SpotifyAPI.getArtistTopTracks(access_token, '0grdhNhiRLFBaFVyybqsj6', 'SG');
    console.log('Artist top tracks:', response);
  } catch (error) {
    console.error('Error in getArtistTopTracks => ', error);
  }
};

useEffect(() => {
  getArtistTopTracks2();
}, []); */

return (
   <View style={styles.container}>
    <View style={styles.headerContainer}>
        <Text
          onPress={() => alert('This is the "Home" screen.')}
          style={styles.text}>Moodify</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchIconContainer}>
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

<Text style={styles.header}>Top Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <ArtistCard item={item} key={index} />
          ))}
        </ScrollView>

<Text style={styles.header}>Recently Played</Text>
   <View style={styles.trackContainer}>
    {tracks.map(tracks => (
   <TrackList data={tracks} {...tracks} />
    ))}
   </View>
</ScrollView>


        <MusicPlayerBar
          songTitle="Song Title"
          artistName="Artist Name"
          coverImage="https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png"
          onPlayPausePress={() => {}}
        />

    </View>
);
}
           const styles = StyleSheet.create({
             container: {
               flex: 1,
               backgroundColor: '#000',
               justifyContent: 'flex-start',
               paddingTop: 20,

             },
             headerContainer: {
                 flexDirection: 'row',
                 alignItems: 'center', // Align items vertically
                 paddingRight: 20,
                 paddingLeft: 20,
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
               paddingLeft: 20,
             },
             artistContainer: {
               flexDirection: 'row',
               paddingBottom: 20,
               paddingLeft: 20,
             },
              trackContainer: {
              width: '95%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 12,
              elevation: 5,
              borderRadius: 10,
              shadowColor: '#303133',
              flexDirection: 'column',
              paddingLeft: 20,
              },
           });







