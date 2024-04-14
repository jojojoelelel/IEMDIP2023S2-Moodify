// src/navigation/BottomNavigation.js
import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import MusicPlayerBar from '../components/MusicPlayerBar';

import {AppContext} from '../navigation/AppNavigation';

// Screen names
const homeRoute = 'Home';
const discoverRoute = 'Discover';
const accountRoute = 'Account';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <>
      <MusicPlayerBar />
      <Tab.Navigator
        initialRouteName={homeRoute}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === homeRoute) {
              iconName = 'home-outline';
            } else if (route.name === discoverRoute) {
              iconName = 'list-outline';
            } else if (route.name === accountRoute) {
              iconName = 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : '#42ffea'}`,
          tabBarInactiveTintColor: `${colorTheme === 'Dark' ? 'grey' : `${process.env.REACT_APP_LIGHTTHEME}`}`,
          tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
          tabBarStyle: {padding: 10, height: 70, backgroundColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKTHEME}` : `${process.env.REACT_APP_LIGHTACCENT}`}`},
        })}>
        <Tab.Screen
          name={homeRoute}
          component={HomeScreen}
          // options={{
          //   tabBarLabel: 'Home',
          //   headerStyle: {
          //     backgroundColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : `${process.env.REACT_APP_LIGHTACCENT}`}`,
          //   },
          //   headerTintColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKTHEME}` : `${process.env.REACT_APP_LIGHTTHEME}`}`,
          // }}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={discoverRoute}
          component={DiscoverScreen}
          // options={{
          //   tabBarLabel: 'Discover',
          //   headerStyle: {
          //     backgroundColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : `${process.env.REACT_APP_LIGHTACCENT}`}`,
          //   },
          //   headerTintColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKTHEME}` : `${process.env.REACT_APP_LIGHTTHEME}`}`,
          // }}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={accountRoute}
          component={AccountScreen}
          // options={{
          //   tabBarLabel: 'Account',
          //   headerStyle: {
          //     backgroundColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : `${process.env.REACT_APP_LIGHTACCENT}`}`,
          //   },
          //   headerTintColor: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKTHEME}` : `${process.env.REACT_APP_LIGHTTHEME}`}`,
          // }}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigation;
