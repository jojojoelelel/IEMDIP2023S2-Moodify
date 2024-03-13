import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';
import {REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET} from '@env';

var Buffer = require('buffer/').Buffer;

const SpotifyContext = createContext();

export function useSpotify() {
  const context = useContext(SpotifyContext);
  console.log('Access Token from useSpotify:', context.accessToken);
  return context;
}

export const SpotifyProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);
  console.log('Access Token updated in SpotifyAuthProvider:', accessToken);
  const redirect_uri = 'http://localhost:8081/callback';
  const client_id = REACT_APP_CLIENT_ID;
  const client_secret = REACT_APP_CLIENT_SECRET;

  const requestUserAuthorization = () => {
    const auth_endpoint = 'https://accounts.spotify.com/authorize';
    const response_type = 'code';
    const scope = encodeURIComponent(
      `user-read-private 
      user-read-email 
      user-modify-playback-state 
      user-read-playback-state 
      streaming 
      user-library-read 
      user-follow-read
      playlist-read-private
      playlist-read-collaborative
      user-read-recently-played`,
    );
    const url = `${auth_endpoint}?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(
      redirect_uri,
    )}`;
    window.location.href = url; // Or use Linking.openURL(url) for React Native
  };

  const requestAccessToken = async code => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirect_uri);

    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      },
    };

    try {
      const response = await axios(authOptions);
      console.log('Access Token TEST TEST TEST:', response.data.access_token); // Logging the access token
      setAccessToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error requesting access token:', error);
      throw error; // Rethrowing the error or handling it as needed
    }
  };
  /*     try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        params.toString(),
        {headers},
      );
      console.log('Access Token:', response.data.access_token);
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error(
        'Error requesting access token:',
        error.response ? error.response.data : error,
      );
    }
  }; */

  const getRecentlyPlayedTracks = async () => {
    if (!accessToken) return [];
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/recently-played',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );
      return response.data.items;
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
      return [];
    }
  };

  const value = {
    accessToken,
    requestUserAuthorization,
    requestAccessToken,
    getRecentlyPlayedTracks,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
