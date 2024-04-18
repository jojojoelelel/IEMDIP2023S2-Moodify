// HomeScreen.js
import React, {useState, useEffect, useContext} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigation from '../../navigation/BottomNavigation.js';

// For API calls
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../AccountScreen/AuthContext';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api';
import {updatePassword} from 'firebase/auth';
// import {access_token2} from '@env';

import {AppContext} from '../../navigation/AppNavigation.js';

// Other screens in Home
import SearchScreen from './SearchScreen';

// components
import ArtistCard from '../../components/ArtistCard.js';
import AlbumCard from '../../components/AlbumCard.js';
import TrackList from '../../components/TrackList.js';
import PlayerControls from '../../components/PlayerControls.js';
import MusicPlayerBar from '../../components/MusicPlayerBar.js';
import {MusicPlayerContext} from '../../contexts/SongContext.js';

export default function HomeScreen({navigation}) {
  // Example data - replace with real data to be added by backend

  const {colorTheme, setColorTheme, access_token, setaccess_token} = useContext(AppContext);

  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const {playTrack, playOrPauseTrack, currentTrack} =
    useContext(MusicPlayerContext);

  const handleSearchPress = () => {
    // Need to navigate to the Search screen properly
    navigation.navigate('Search');
  };

  const spotifyApi = new SpotifyWebApi();
  // const access_token = access_token2;

  const getFollowedArtist2 = async () => {
    try {
      const response = await SpotifyAPI.getFollowedArtists(access_token, 5);
      // console.log(response.artists.items); // Log the response object
      console.log('api call getfollowedartist')
      setTopArtists(prevData => [
        ...prevData,
        ...response.artists.items.map(artist => ({
          ...artist,
          imageUrl:
            artist.images && artist.images.length > 0
              ? artist.images[0].url
              : '', // Provide a default image URL as fallback
        })),
      ]);
    } catch (error) {
      console.error('Error in getFollowedArtists => ', error);
    }
  };

  // useEffect(() => {
  //   getFollowedArtist2();
  // }, []);
  //console.log(topArtists);
  //
  const getArtistAlbums2 = async () => {
    try {
      const response = await SpotifyAPI.getArtistAlbums( access_token, '1hGdQOfaZ5saQ6JWVuxVDZ',);
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
    const handleAlbumPress = (albums) => {
      // To navigate to a album detail screen:
      navigation.navigate('AlbumDetails', {albums});
    };

  const getArtistTopTracks2 = async () => {
    try {
      const response = await SpotifyAPI.getArtistTopTracks(
        access_token,
        '0grdhNhiRLFBaFVyybqsj6',
        'SG',
      );
      //console.log(response);
      // console.log(response.tracks);
      console.log('api call getartisttoptrack')
      setTopTracks(
        response.tracks.map(track => ({
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(', '), // Join multiple artists with a comma
          cover: track.album.images.length > 0 ? track.album.images[0].url : '', // Provide a default image URL as fallback
          url: track.preview_url,
        })),
      );
    } catch (error) {
      console.error('Error in getArtistTopTracks => ', error);
    }
  };

  // useEffect(() => {
  //   getArtistTopTracks2();
  // }, []);
  useEffect(() => {
    if (access_token) {
      getArtistAlbums2();
      getFollowedArtist2();
      getArtistTopTracks2();
    }
  }, [access_token]);

  const handleItemPress = item => {
    playTrack(item);
  };

  const handleArtistPress = (artists) => {
    navigation.navigate('ArtistDetails', {artists});
  };

  return (
    <ImageBackground
      source={colorTheme === 'Dark' ? require('../../assets/images/sign-in-bgDark.jpg') : require('../../assets/images/backgroundLight.jpg')} // Replace with your actual background image path
      style={styles.background}>
      {/* <> */}
      {/* <View style={colorTheme === 'Dark' ? styles.containerDark : styles.containerLight}> */}
        
        <View style={colorTheme === 'Dark' ? styles.headerContainerDark : styles.headerContainerLight}>
          <Text
            onPress={() => alert('This is the "Home" screen.')}
            style={colorTheme === 'Dark' ? styles.textDark : styles.textLight}>
            Moodify
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchIconContainer}>
            <Ionicons
              name="search"
              size={24}
              color={colorTheme === 'Dark' ? process.env.REACT_APP_LIGHTTHEME : process.env.REACT_APP_DARKTHEME}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={colorTheme === 'Dark' ? styles.headerDark : styles.headerLight}>Recent Albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topAlbums.map((item, index) => (
            <AlbumCard item={item}
                        key={index}
                        imageUrl={item.imageUrl}
                        onPress={() => handleAlbumPress(item)}/>
          ))}
          </ScrollView>

          <Text style={colorTheme === 'Dark' ? styles.headerDark : styles.headerLight}>Top Artists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topArtists.map((item, index) => (
              <ArtistCard
                item={item}
                key={index}
                imageUrl={item.imageUrl}
                onPress={() => handleArtistPress(item)}
              />
            ))}
          </ScrollView>

          <Text style={colorTheme === 'Dark' ? styles.headerDark : styles.headerLight}>Recently Played</Text>
          <View style={styles.trackContainer}>
            <FlatList
              data={topTracks} // Use topTracks instead of track
              renderItem={({item}) => (
                <TrackList
                  id={item.id}
                  title={item.title}
                  artist={item.artist}
                  cover={item.cover}
                  url={item.preview_url}
                  onPress={() => handleItemPress(item)}
                />
              )}
            />
          </View>
        </ScrollView>
        <MusicPlayerBar />
      {/* </View> */}
    </ImageBackground>
    // </>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  containerDark: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_DARKTHEME}`,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  containerLight: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  headerContainerDark: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${process.env.REACT_APP_DARKACCENT}`,
  },
  headerContainerLight: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  textDark: {
    fontSize: 30,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  textLight: {
    fontSize: 30,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
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
  headerDark: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  headerLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    elevation: 5,
    borderRadius: 10,
    shadowColor: '#303133',
    flexDirection: 'column',
    // paddingLeft: 20,
    alignSelf: 'center',
  },
});
