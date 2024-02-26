import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Sign-Up screens
import GettingStarted from './screens/SignUpScreen/GettingStarted.js';
import SignInScreen from './screens/SignUpScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './screens/SignUpScreen/ForgotPasswordScreen';

//App Screens
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import AccountScreen from './screens/AccountScreen/AccountScreen';

//Bottom Navigation
import BottomNavigation from '/Users/sneha.m7/Moodify/navigation/BottomNavigation.js';

// Home screen
import SearchScreen from './screens/SearchScreen';

// Discover screen
import ChatBotScreen from './screens/ChatBotScreen';

// Account Screens
import PlaylistsScreen from './screens/AccountScreen/MyPlaylistScreen';
import PlaylistDetailsScreen from './screens/AccountScreen/PlaylistDetailsScreen';
import FollowingScreen from './screens/AccountScreen/directFollowing';
import FollowerScreen from './screens/AccountScreen/directFollower';
import PIscreen from './screens/AccountScreen/directProfileInfo';
import SScreen from './screens/AccountScreen/directSetting';
import FullMusicPlayerScreen from './screens/MusicPlayerScreen/FullMusicPlayerScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="Main" component={BottomNavigation} options={{headerShown: false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Stack.Screen name ='SearchScreen' component={SearchScreen} />
      <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
      <Stack.Screen name="MyPlaylists" component={PlaylistsScreen} />
      <Stack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FollowerScreen" component={FollowerScreen} options={{headerShown: false}} />
      <Stack.Screen name="PIScreen" component={PIscreen} options={{headerShown: false}}/>
       <Stack.Screen name="SScreen" component={SScreen} options={{headerShown: false}}/>
       <Stack.Screen name="FullMusicPlayerScreen" component={FullMusicPlayerScreen} />
      {/* Add more screens as needed */}
     </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator