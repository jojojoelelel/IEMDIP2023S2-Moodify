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
//import {access_token} from '@env';

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

  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);


const handleSearchPress = () => {
// Need to navigate to the Search screen properly
   navigation.navigate('Search');
};


 const spotifyApi = new SpotifyWebApi();
 const access_token = 'BQBoXd2HU3jE-0yDeRG0vk3GbP6QrqoMSz8LhkxRQtyF2vZmQdDSe_3212O2LPWdIhOWbHapR50MRlesOQ4a8B_NvOuN-KUxXDoC4angQYxS6m_05IlVRek4hzHyf4sQCEJ58EKni_wVCsVLDtA1u7iTUcyeOyKCLVcxmSNroIrbVcHWLshzaYIiAlTGnECYAKXOmhBdl9Dsaa8hWVMlhcVkfwcr6PlRaoYNRj7yggRSjh_C7X8Oq_x-lnWl'; // Replace with your actual access token

const getFollowedArtist2 = async () => {
    try {
        const response = await SpotifyAPI.getFollowedArtists(access_token, 5);
        console.log(response.data.artists.items); // Log the response object
        setTopArtists((prevData) => [
            ...prevData,
            ...response.data.artists.items.map(artist => ({
                ...artist,
                imageUrl: artist.images && artist.images.length > 0
                ? artist.images[0].url
                : '' // Provide a default image URL as fallback
            }))
        ]);

    } catch (error) {
        console.error('Error in getFollowedArtists => ', error)
    }
};

useEffect(() => {
  getFollowedArtist2();
}, []);
//console.log(topArtists);

const getArtistAlbums2 = async () => {
  try {
    const response = await SpotifyAPI.getArtistAlbums(access_token, '1hGdQOfaZ5saQ6JWVuxVDZ');
    console.log(response.data.items);
            setTopAlbums((prevData) => [
                ...prevData,
                ...response.data.items.map(album => ({
                    id: album.id,
                    name: album.name,
                    artist: album.artists.map(artist => artist.name).join(', '),
                    imageUrl: album.images && album.images.length > 0
                    ? album.images[0].url
                    : '' // Provide a default image URL as fallback
                }))
            ]);
  } catch (error) {
    console.error('Error in getArtistAlbums => ', error);
  }
};

useEffect(() => {
  getArtistAlbums2();
}, []);

  // Function to handle item press if needed
  const handleItemPress = album => {
    // To navigate to a album detail screen:
    navigation.navigate('AlbumDetails', {album, artist: album.artist});
  };

const getArtistTopTracks2 = async () => {
  try {
    const response = await SpotifyAPI.getArtistTopTracks(access_token, '0grdhNhiRLFBaFVyybqsj6', 'SG');
    //console.log(response);
    console.log(response.data.tracks);
    setTopTracks(
      response.data.tracks.map(track => ({
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '), // Join multiple artists with a comma
        imageUrl:
            track.album.images.length > 0
             ? track.album.images[0].url
             : '' // Provide a default image URL as fallback
      })),
    );
  } catch (error) {
    console.error('Error in getArtistTopTracks => ', error);
  }
};

useEffect(() => {
  getArtistTopTracks2();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          onPress={() => alert('This is the "Home" screen.')}
          style={styles.text}
        >
          Moodify
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.searchIconContainer}
        >
          <Ionicons name="search" size={24} color="#fff" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Recent Albums</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topAlbums.map((item, index) => (
            <AlbumCard item={item}
                        key={index}
                        imageUrl={item.imageUrl}
                        onPress={() => handleItemPress(item)}/>
          ))}
        </ScrollView>

        <Text style={styles.header}>Top Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <ArtistCard item={item} key={index} imageUrl={item.imageUrl} />
          ))}
        </ScrollView>

        <Text style={styles.header}>Recently Played</Text>
        <View style={styles.trackContainer}>
          <FlatList
            data={topTracks} // Use topTracks instead of track
            renderItem={({ item }) => (
              <TrackList
                title={item.title}
                artist={item.artist}
                imageUrl={item.imageUrl}
                onPress={() => handleItemPress(item)}
              />
            )}
          />
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

