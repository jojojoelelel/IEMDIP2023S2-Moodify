// src/navigation/BottomNavigation.js
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';

// Screen names
const homeName = 'HomeScreen';
const discoverName = 'DiscoverScreen';
const accountName = 'AccountScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === homeName) {
            iconName = 'home-outline';
          } else if (route.name === discoverName) {
            iconName = 'list-outline';
          } else if (route.name === accountName) {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#CBFB5E',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
        tabBarStyle: {padding: 10, height: 70, backgroundColor: 'black'},
      })}>
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={discoverName} component={DiscoverScreen} />
      <Tab.Screen name={accountName} component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
