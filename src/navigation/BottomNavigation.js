// src/navigation/BottomNavigation.js
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import MusicPlayerBar from '../components/MusicPlayerBar';

// Screen names
const homeRoute = 'Home';
const discoverRoute = 'Discover';
const accountRoute = 'Account';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
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
          tabBarActiveTintColor: '#CBFB5E',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
          tabBarStyle: {padding: 10, height: 70, backgroundColor: 'black'},
        })}>
        <Tab.Screen
          name={homeRoute}
          component={HomeScreen}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name={discoverRoute}
          component={DiscoverScreen}
          options={{tabBarLabel: 'Discover'}}
        />
        <Tab.Screen
          name={accountRoute}
          component={AccountScreen}
          options={{tabBarLabel: 'Account'}}
        />
      </Tab.Navigator>
      <MusicPlayerBar />
    </>
  );
};

export default BottomNavigation;
