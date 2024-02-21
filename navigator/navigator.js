import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import {Text} from 'react-native'

const Stack = createStackNavigator();

const MainNav = () => {
    return (
        <>
        <Text>
            Logged in
        </Text>
        <Stack.Navigator> 
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
        </>
    )
}

export default MainNav;