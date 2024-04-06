// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native'
// import React, { useState } from 'react'
import axios from 'axios'
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET} from '@env'

var Buffer = require('buffer/').Buffer

const redirect_uri = 'http://localhost:8081/callback';
const client_secret = REACT_APP_CLIENT_SECRET;
const client_id = REACT_APP_CLIENT_ID;

export async function requestUserAuthorization () {
    // Login to Spotify to request authorization from the user to access
    // Spotify's resources on the user's behalf

    const auth_endpoint = 'https://accounts.spotify.com/authorize';
    const response_type = 'code';
    const scope = `user-read-private 
    user-read-email 
    user-modify-playback-state 
    user-read-playback-state 
    streaming 
    user-library-read 
    user-follow-read
    playlist-read-private
    playlist-read-collaborative
    `;
      
    const url = `${auth_endpoint}?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

    return url;
}

export async function requestAccessToken (return_Params) {

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: return_Params,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    }

    try {
        const response = await axios.post(authOptions.url, authOptions.form, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        // console.log('Refresh token => ', response.data.refresh_token)
        return response.data
        // return response.data.access_token
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function getCurrentUserProfile (access_token) {
    const authOptions = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data;
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function getDeviceID (access_token) {
    console.log(access_token);
    const authOptions = {
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }

    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response)
        return response.data;
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function getUserProfile (access_token, user_id) {
    // get user profile information
    const authOptions = {
        url: `https://api.spotify.com/v1/users/${user_id}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data;
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getPreviewURL (data) {
    if (data && data.items && data.items.length > 0) {
        const previewUrl = data.items[0].track.preview_url;
        // console.log('Preview URL:', previewUrl);
        return previewUrl;
    }
}

export async function getUserSavedTracks (access_token, limit, offset) {
    const authOptions = {
        url : 'https://api.spotify.com/v1/me/tracks?offset=0&limit=1',
        headers : {
            'Authorization' : 'Bearer ' + access_token,
        },
    }

    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        const data = response.data
        const previewUrl = getPreviewURL(data)
        console.log('Preview URL: ', previewUrl)
        return previewUrl;
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
   
}

export async function getFollowedArtists(access_token, limit) {
    // get current user's followed artists
    const authOptions = {
        url: 'https://api.spotify.com/v1/me/following?type=artist',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    }

    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response)
        return response.data;
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function checkIfUserFollowsArtistsOrUsers(access_token, type, ids) {
    // check if current user follows artists or users
    const authOptions = {
        url: `https://api.spotify.com/v1/me/following/contains?type=${type}&ids=${ids}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }

    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function checkIfUserFollowsPlaylist (access_token, playlist_id, ids) {
    // check if a user follows a playlist
    const authOptions = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/followers/contains?ids=${ids}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }

}

export async function checkUserSavedTracks (access_token, ids) {
    // checks if current user has saved the tracks in their library
    // ids is comma separated ids=1312412,151241231,123123
    // max 50 IDs
    const authOptions = {
        url: `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getCurrentUserPlaylist (access_token) {
  // get a playlist owned/followed by a Spotify User
  const authOptions = {
      url: `https://api.spotify.com/v1/me/playlists`,
      headers: {
          'Authorization': 'Bearer ' + access_token
      }
  }
  try {
      const response = await axios.get(authOptions.url, {
          headers: authOptions.headers
      })
      console.log('Response => ', response.data)
      return response.data
  } catch (error) {
      console.error('Error => ', error)
      throw error;
  }   
}

export async function getUserPlaylist (access_token, user_id) {
    // get a playlist owned/followed by a Spotify User
    const authOptions = {
        url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getArtist (access_token, id) {
    // get artist information
    const authOptions = {
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getArtistAlbums (access_token, id) {
    // get artist albums
    const authOptions = {
        url: `https://api.spotify.com/v1/artists/${id}/albums`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getArtistTopTracks (access_token, id, market) {
    // get artist top tracks
    const authOptions = {
        url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function getTrack (access_token, id) {
    // get track information
    const authOptions = {
        url: `https://api.spotify.com/v1/tracks/${id}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data.preview_url)
        return response.data.preview_url;
        // console.log(response.data.preview_url)
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }   
}

export async function searchTrack (access_token, queryString, type) {
    const q = encodeURIComponent(queryString)

    const authOptions = {
        url: `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=1&offset=1`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    try {
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })
        // console.log('Response => ', response.data.tracks.items[0].preview_url)
        console.log('Response => ', response.data.tracks.items[0])
        return response.data.tracks.items[0].preview_url
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }  
}

export async function requestRefreshAccessToken (refresh_token) {

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    }

    try {
        const response = await axios.post(authOptions.url, authOptions.form, {
            headers: authOptions.headers
        })
        console.log('Response => ', response.data)
        return response.data
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}

export async function getPlaylistDetails(access_token, playlist_id) {
  const authOptions = {
    url: `https://api.spotify.com/v1/playlists/${playlist_id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(authOptions.url, {
      headers: authOptions.headers,
    });
    const tracksInfo = response.data.tracks.items.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      cover:
        item.track.album.images.length > 0
          ? item.track.album.images[0].url
          : '',
      album: item.track.album.name,
      duration_ms: item.track.duration_ms,
      preview_url: item.track.preview_url,
    }));

    //console.log('Playlist Details Response => ', tracksInfo);
    return tracksInfo; // Return the simplified playlist information
  } catch (error) {
    console.error('Error fetching playlist details => ', error);
    throw error;
  }
}