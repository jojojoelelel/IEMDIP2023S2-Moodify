import React, {useState} from 'react';
import AppNavigator from './src/navigation/AppNavigation'; // Ensure this path is correct
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import BottomNavigation from './src/navigation/BottomNavigation';
import { AuthProvider } from './src/screens/AccountScreen/AuthContext'

function App() {

  const [test, settest] = useState('yes');

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <AuthProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <AppNavigator test={test}/>
      </NavigationContainer>
    </SafeAreaView></AuthProvider>
  );
}

export default App;

