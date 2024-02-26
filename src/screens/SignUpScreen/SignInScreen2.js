import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize} from 'react-native-app-auth';

const SignInScreen = ({navigation}) => {
  // Define the configuration for Spotify authentication
  const spotifyAuthConfig = {
    clientId: 'ef923e84a90f48a2a34227a19f432749',
    clientSecret: 'e235e28428df4b35a4965a43d479d120',
    redirectUrl: 'moodify-app://callback',
    scopes: [
      'user-read-email',
      'user-library-read',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      // Add any other scopes as needed
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  // Function to handle sign in with Spotify
  const signInWithSpotify = async () => {
    try {
      const result = await authorize(spotifyAuthConfig);
      await AsyncStorage.setItem('token', result.accessToken);
      if (result.refreshToken) {
        await AsyncStorage.setItem('refreshToken', result.refreshToken);
      }
      // Navigate to the main part of your app
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Failed to log in', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/sign-in-bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        {/* The email and password fields are not required for Spotify auth */}
        <TouchableOpacity style={styles.button} onPress={signInWithSpotify}>
          <Text style={styles.buttonText}>SIGN IN WITH SPOTIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1DB954', // Spotify brand color for the button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  signUpButtonText: {
    fontWeight: 'bold',
    color: '#CBFB5E',
  },
  // ... any other styles you have
});

export default SignInScreen;
