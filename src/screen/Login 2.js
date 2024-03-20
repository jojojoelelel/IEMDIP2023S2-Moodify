import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

import {Auth} from '../services'
import Sound from 'react-native-sound'

import * as SpotifyAPI from '../services/Spotify-web-api'

const Login = ({navigation}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [return_Params, setreturn_Params] = useState();
    const [access_token, setaccess_token] = useState();
    const [userData, setuserData] = useState();
    const [playerInfo, setplayerInfo] = useState();
    const [previewUrl, setpreviewUrl] = useState();
    const [refresh_token, setrefresh_Token] = useState();

    const redirect_uri = 'http://localhost:8081/callback';
    
    const handleRedirect = (event) => {
        // Extract the URL from the event
        const url = event.url;
    
        // Check if the URL starts with the custom URI scheme
        if (url.startsWith(redirect_uri)) {
            // Extract the query parameters from the URL
            const params = url.split('?code=')[1];
            // Do something with the query parameters (e.g., parse them and handle the response)
            console.log('Response query parameters:', params);
            setreturn_Params(params);
        }
    }
    
    // Add a listener to handle deep links
    Linking.addEventListener('url', handleRedirect);

    const loginToSpotify = async () => {
        // // request user authorization
        // // const state = generateRandomString(16);
        try {
            const url = await SpotifyAPI.requestUserAuthorization();
            Linking.openURL(url);
        } catch (error) {
            console.error('Error in requestAccessToken => ', error)
        }
    }

    const requestAccessToken2 = async () => {

        try {
            const response = await SpotifyAPI.requestAccessToken(return_Params);
            setaccess_token(response.access_token);
            setrefresh_Token(response.refresh_token);
        } catch (error) {
            console.error('Error in requestAccessToken => ', error)
        }
    }

    const requestRefreshAccessToken2 = async () => {

        try {
            const response = await SpotifyAPI.requestRefreshAccessToken(refresh_token);
            setaccess_token(response.access_token);
            setrefresh_Token(response.refresh_token);
        } catch (error) {
            console.error('Error in requestRefreshAccessToken => ', error)
        }

    }

    useEffect(() => {
        const refreshInterval = setInterval(requestRefreshAccessToken2, 3600 * 1000);

        return () => clearInterval(refreshInterval);
    }, []);

    useEffect(() => {
        if(return_Params) {
            requestAccessToken2();
        }
    },[return_Params])

    const getUserProfile2 = async () => {

        try {
            const response = await SpotifyAPI.getUserProfile(access_token, 'h76bjnjtq32wksw089gdk2ybl');
            setuserData(response)
        } catch (error) {
            console.error('Error in getUserProfile => ', error)
        }
    }

    const getCurrentUserProfile2 = async () => {

        try {
            const response = await SpotifyAPI.getCurrentUserProfile(access_token);
            setuserData(response)
        } catch (error) {
            console.error('Error in getCurrentUserProfile => ', error)
        }

    }

    const getdeviceID2 = async () => {
        
        try {
            const response = await SpotifyAPI.getDeviceID(access_token);
        } catch (error) {
            console.error('Error in getdeviceID => ', error)
        }
    }

    const playMusicOnDevice = async () => {

        const authOptions = {
            
            url: 'https://api.spotify.com/v1/me/player/play?device_id=56f7db82bbf7b1c85fee5e1bf6d3f29d5ee529f0',
            data: {
                'context_uri': 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
                'offset': {
                    'position': 5
                },
                'position_ms': 0
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json',
            },
        };

        axios.put(authOptions.url, authOptions.data, {
            headers: authOptions.headers
        })
        .then(response => {
            console.log('PLAY SONG Response => ', response)
        })
        .catch(error => {
            console.error('Error => ', error);
        });
    }

    const startMusic = async (preview_url) => {

        const sound = new Sound(preview_url, null, (error) => {
            if (error) {
              console.error('Failed to load the sound', error);
              return;
            }
            // Play the sound
            sound.play((success) => {
              if (success) {
                console.log('Sound played successfully');
              } else {
                console.error('Failed to play the sound');
              }
            });
          });
    }

    const getFollowedArtists2 = async () => {
        try {
            const response = await SpotifyAPI.getFollowedArtists(access_token, 5);
        } catch (error) {
            console.error('Error in getFollowedArtists => ', error)
        }
    }

    const getSavedTracks2 = async () => {

        try {
            const previewUrl = await SpotifyAPI.getUserSavedTracks(access_token, 5, 5);
            // startMusic(previewUrl);
        } catch (error) {
            console.error('Error in getUserSavedTracks => ', error)
        }
    }

    const checkIfUserFollowsArtistsOrUsers2 = async () => {
        try {
            const response = await SpotifyAPI.checkIfUserFollowsArtistsOrUsers(access_token, 'artist', '0grdhNhiRLFBaFVyybqsj6');
        } catch (error) {
            console.error('Error in checkIfUserFollowsArtistsOrUsers => ', error)
        }
    }

    const checkIfUserFollowsPlaylist2 = async () => {
        try {
            const response = await SpotifyAPI.checkIfUserFollowsPlaylist(access_token, '6fU3H8a6Il3C2C9znNku5r', 'h76bjnjtq32wksw089gdk2ybl');
        } catch (error) {
            console.error('Error in checkIfUserFollowsPlaylist => ', error)
        }
    }

    const checkUserSavedTracks2 = async () => {
        try {
            const response = await SpotifyAPI.checkUserSavedTracks(access_token, '7tbJozWewwmFvTkXCUFtt0');
        } catch (error) {
            console.error('Error in checkUserSavedTracks => ', error)
        }
    }

    const getUserPlaylist2 = async () => {
        try {
            const response = await SpotifyAPI.getUserPlaylist(access_token, 'h76bjnjtq32wksw089gdk2ybl');
        } catch (error) {
            console.error('Error in getUserPlaylist => ', error)
        }
    }

    const getArtist2 = async () => {
        try {
            const response = await SpotifyAPI.getArtist(access_token, '1hGdQOfaZ5saQ6JWVuxVDZ');
        } catch (error) {
            console.error('Error in getArtist => ', error)
        }
    }

    const getArtistAlbums2 = async () => {
        try {
            const response = await SpotifyAPI.getArtistAlbums(access_token, '1hGdQOfaZ5saQ6JWVuxVDZ');
        } catch (error) {
            console.error('Error in getArtistAlbums => ', error)
        }
    }

    const getArtistTopTracks2 = async () => {
        try {
            const response = await SpotifyAPI.getArtistTopTracks(access_token, '0grdhNhiRLFBaFVyybqsj6', 'SG');
        } catch (error) {
            console.error('Error in getArtistTopTracks => ', error)
        }
    }

    const getTrack2 = async () => {
        try {
            const response = await SpotifyAPI.getTrack(access_token, '6zm8NjhBTrqtKUA6OIc0fk');
        } catch (error) {
            console.error('Error in getTrack => ', error)
        }
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder='Enter email'
                onChangeText={(e) => setEmail(e)}
                style={(styles.textinput)}
            />
            <TextInput
                placeholder='Enter password'
                onChangeText={(e) => setPassword(e)}
                style={(styles.textinput)}
            />
            <TouchableOpacity onPress={() => Auth.signIn(email, password)}>
                <View style={(styles.button)}>
                    <Text>Login</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <View style={(styles.button)}>
                    <Text>Create Account</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => loginToSpotify()}>
                <View style={(styles.button)}>
                    <Text>Request user authorization</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => requestAccessToken2()}>
                <View style={(styles.button)}>
                    <Text>Request access token</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getUserProfile2()}>
                <View style={(styles.button)}>
                    <Text>Get User Profile Information</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getCurrentUserProfile2()}>
                <View style={(styles.button)}>
                    <Text>Get current user profile information</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playMusicOnDevice()}>
                <View style={(styles.button)}>
                    <Text>Play Music</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getdeviceID2()}>
                <View style={(styles.button)}>
                    <Text>Get device ID</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getSavedTracks2()}>
                <View style={(styles.button)}>
                    <Text>Get saved tracks</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startMusic()}>
                <View style={(styles.button)}>
                    <Text>Start Music Preview</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getFollowedArtists2()}>
                <View style={(styles.button)}>
                    <Text>Get Followed Artists</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkIfUserFollowsArtistsOrUsers2()}>
                <View style={(styles.button)}>
                    <Text>Check If Following Artists</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkIfUserFollowsPlaylist2()}>
                <View style={(styles.button)}>
                    <Text>Check If Following Playlist</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkUserSavedTracks2()}>
                <View style={(styles.button)}>
                    <Text>Check If User Has Saved This Track</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getUserPlaylist2()}>
                <View style={(styles.button)}>
                    <Text>Get User's Playlists</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getArtist2()}>
                <View style={(styles.button)}>
                    <Text>Get Artist</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getArtistAlbums2()}>
                <View style={(styles.button)}>
                    <Text>Get Artist Albums</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getArtistTopTracks2()}>
                <View style={(styles.button)}>
                    <Text>Get Artist Top Tracks</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getTrack2()}>
                <View style={(styles.button)}>
                    <Text>Get Track</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    textinput:{
        backgroundColor:'grey',
        color:'black',
        fontSize:18,
    },
    button:{
        alignItems:'center',
        backgroundColor:'green',
        padding:10,
        margin:10
    },
    webView: {
        flex: 1,
        borderWidth: 5, borderColor: '#1893F8',
    },
})