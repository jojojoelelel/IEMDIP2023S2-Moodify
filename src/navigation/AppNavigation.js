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
import FollowingScreen from '../screens/AccountScreen/directFollowing';
import FollowerScreen from '../screens/AccountScreen/directFollower';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import PIscreen from '../screens/AccountScreen/directProfileInfo';
import SScreen from '../screens/AccountScreen/directSetting';
import FullMusicPlayerScreen from '../screens/MusicPlayerScreen/FullMusicPlayerScreen';

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
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FollowerScreen" component={FollowerScreen} options={{headerShown: false}} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} options={{headerShown: false}}/>
      <Stack.Screen name="PIScreen" component={PIscreen} options={{headerShown: false}}/>
      <Stack.Screen name="SScreen" component={SScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FullMusicPlayerScreen" component={FullMusicPlayerScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
