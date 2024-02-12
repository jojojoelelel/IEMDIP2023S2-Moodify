import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from "./src/pages/profile";
import PLscreen from "./src/pages/profile/directPlaylist";
import ABscreen from "./src/pages/profile/directAlbum";
import PIscreen from "./src/pages/profile/directprofileinfo";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PL" component={PLscreen} />
        <Stack.Screen name="AB" component={ABscreen} />
        <Stack.Screen name="PI" component={PIscreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
