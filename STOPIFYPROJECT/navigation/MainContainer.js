import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';
import ChatBotScreen from './screens/ChatBotScreen';

// Screen names
const homeName = "Home";
const discoverName = "Discover";
const accountName = "Account";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = 'home-outline';
            } else if (rn === discoverName) {
              iconName = 'list-outline';
            } else if (rn === accountName) {
              iconName = 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        screenOptions={{
          activeTintColor: '#CBFB5E',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70, backgroundColor: 'black' }
        }}>
        <Tab.Screen name={homeName} component={StackNavigator} />
        <Tab.Screen name={discoverName} component={DiscoverNavigator} />
        <Tab.Screen name={accountName} component={AccountScreen} />
      </Tab.Navigator>
</NavigationContainer>
  );
        function StackNavigator() {
          return (
          <Stack.Navigator>
          <Stack.Screen name = 'HomeScreen' component={HomeScreen}/>
          <Stack.Screen name = 'SearchScreen' component={SearchScreen}/>
          </Stack.Navigator>
        );
  }
         function DiscoverNavigator() {
           return (
           <Stack.Navigator>
           <Stack.Screen name = 'DiscoverScreen' component={DiscoverScreen}/>
           <Stack.Screen name = 'ChatBotScreen' component={ChatBotScreen}/>
           </Stack.Navigator>
         );
    }
}

export default MainContainer;
