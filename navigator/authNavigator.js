import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from '../src/screen/Login';
import SignUp from '../src/screen/SignUp';
import Home from '../src/screen/Home';
import {Text} from 'react-native';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <>
        <Text>
            The thing
        </Text>
        <Stack.Navigator initialRouteName = 'Login'> 
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
        </>
    )
}

export default AuthNavigator;