import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Import the screens here
import GettingStarted from '../screens/SignUpScreen/GettingStarted';
import SignInScreen from '../screens/SignUpScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/SignUpScreen/ForgotPasswordScreen';
import BottomNavigation from './BottomNavigation';
//import NextScreen from '../screens/SignUpScreen/NextScreen';
import PlaylistsScreen from '../screens/AccountScreen/MyPlaylistScreen';
import PlaylistDetailsScreen from '../screens/AccountScreen/PlaylistDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="Main"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      {/* Add more screens as needed */}
      <Stack.Screen name="MyPlaylists" component={PlaylistsScreen} />
      <Stack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
