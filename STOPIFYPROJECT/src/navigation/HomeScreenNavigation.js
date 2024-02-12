import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountScreen from './screens/AccountScreen';

// Screen names
const homeName = 'Home';
const discoverName = 'Discover';
const accountName = 'Account';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === discoverName) {
              iconName = focused ? 'location' : 'location-outline';
            } else if (rn === accountName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        tabBarOptions=
        {{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: {paddingBottom: 10, fontSize: 10},
          style: {padding: 10, height: 70},
        }}
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={discoverName} component={DiscoverScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;