import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//Import the screens here
import GettingStarted from '../screens/SignUpScreen/GettingStarted';
//import NextScreen from '../screens/SignUpScreen/NextScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name = "GettingStarted" component={GettingStarted}/>
                {/* Add more screens as needed */}
            </Stack.Navigator>
    );
};

export default AppNavigator;