import React, { createContext, useContext, useState, useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigation'; // Ensure this path is correct
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import BottomNavigation from './src/navigation/BottomNavigation';
// import { SpotifyProvider } from './src/services/SpotifyAuthContext';
import { MusicPlayerProvider, MusicPlayerContext } from './src/contexts/SongContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <MusicPlayerProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </MusicPlayerProvider>
  );
}

export default App;

