import React, {useState, createContext, useContext} from 'react';
import {
  REACT_APP_DARKACCENT,
  REACT_APP_LIGHTACCENT,
  REACT_APP_DARKTHEME,
  REACT_APP_LIGHTTHEME,
} from '@env';
import {createStackNavigator} from '@react-navigation/stack';

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
// import FullMusicPlayerScreen from '../screens/MusicPlayerScreen/FullMusicPlayerScreen';
import SearchScreen from '../screens/HomeScreen/SearchScreen';
import AlbumDetailsScreen from '../screens/HomeScreen/AlbumDetailsScreen';
import ChatBotScreen from '../screens/ChatBotScreen/ChatBotScreen';
import VrConcertScreen from '../screens/DiscoverScreen/VrConcertScreen';
import MusicPlayerBar from '../components/MusicPlayerBar';
import MusicPlayerScreen from '../screens/MusicPlayerScreen';
import LikedSongsScreen from '../screens/AccountScreen/LikedSongsScreen';
import DiaryScreen from '../screens/AccountScreen/directDiary';
import AlbumsScreen from '../screens/AccountScreen/AlbumScreen';
import RecomScreen from '../screens/AccountScreen/RecomScreen';
import ArtistScreen from '../screens/AccountScreen/ArtistScreen';
import ArtistDetailsScreen from '../screens/AccountScreen/ArtistDetailsScreen';

const Stack = createStackNavigator();

export const AppContext = createContext(null);

const AppNavigator = () => {
  const [access_token, setaccess_token] = useState();
  const [colorTheme, setColorTheme] = useState('Light');
  // const [colorTheme, setColorTheme] = useState('Dark');

  console.disableYellowBox = true

  return (
    <AppContext.Provider
      value={{access_token, setaccess_token, colorTheme, setColorTheme}}>
      <Stack.Navigator>
        <Stack.Screen
          name="GettingStarted"
          component={GettingStarted}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />

        {/* Add more screens as needed */}
        <Stack.Screen
          name="MyPlaylists"
          component={PlaylistsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="PlaylistDetails"
          component={PlaylistDetailsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="AlbumDetails"
          component={AlbumDetailsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="ArtistDetails"
          component={ArtistDetailsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        {/* <Stack.Screen
        name="FullMusicPlayerScreen"
        component={FullMusicPlayerScreen}
      /> */}
        <Stack.Screen
          name="FollowingScreen"
          component={FollowingScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="FollowerScreen"
          component={FollowerScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="DiaryScreen"
          component={DiaryScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="RecomScreen"
          component={RecomScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="PIScreen"
          component={PIscreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="SScreen"
          component={SScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }} />
        <Stack.Screen
          name="VrConcertScreen"
          component={VrConcertScreen}
          options={{
            title: 'VR Concert',
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="MusicPlayerScreen"
          component={MusicPlayerScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="LikedSongsScreen"
          component={LikedSongsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="AlbumsScreen"
          component={AlbumsScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="ArtistScreen"
          component={ArtistScreen}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{
            headerStyle: {
              backgroundColor:
                colorTheme === 'Dark'
                  ? REACT_APP_DARKACCENT
                  : REACT_APP_LIGHTACCENT,
            },
            headerTintColor:
              colorTheme === 'Dark'
                ? REACT_APP_DARKTHEME
                : REACT_APP_LIGHTTHEME,
          }}
        />
      </Stack.Navigator>
    </AppContext.Provider>
  );
};

export default AppNavigator;
