import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Import the screens here
import GettingStarted from '../screens/SignUpScreen/GettingStarted';
import SignInScreen from '../screens/SignUpScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/SignUpScreen/ForgotPasswordScreen';
import ProfileInfo from '../screens/AccountScreen/Profile';
import BottomNavigation from './BottomNavigation';
import PIscreen from '../screens/AccountScreen/directProfileInfo';
import ChatBotScreen from '../screens/ChatBotScreen/ChatBotScreen';
import SScreen from '../screens/AccountScreen/directSetting';
import FollowingScreen from '../screens/AccountScreen/directFollowing';
import FollowerScreen from '../screens/AccountScreen/directFollower';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Main" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileInfo} />
        <Stack.Screen name="PI" component={PIscreen} />
        <Stack.Screen name="SS" component={SScreen} />
        <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
        <Stack.Screen name="FollowerScreen" component={FollowerScreen} />

      </Stack.Navigator>
  );
};

export default AppNavigator;
