import React from 'react';
import AppNavigator from './navigation/AppNavigation'; // Ensure this path is correct
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;

