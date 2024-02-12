import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import AccountScreen from './screens/AccountScreen';

// Screen names
const homeName = "Home";
const discoverName = "Discover";
const accountName = "Account";

const Tab = createBottomTabNavigator();

function MainContainer() {
return (
       <NavigationContainer>
        <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                let iconName;
                let rn = route.name;

                if(rn === homeName) {
                    iconName = 'home-outline';
                } else if (rn === discoverName) {
                    iconName = 'list-outline';
                } else if (rn === accountName) {
                    iconName = 'settings-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>
                // https://www.youtube.com/watch?v=AnjyzruZ36E&t=602s
            },
        })}
        screenOptions={{
            tabBarActiveTintColor: '#CBFB5E',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
            tabBarStyle: { padding: 10, height: 70, backgroundColor: 'black' }
        }}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={discoverName} component={DiscoverScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />
        
        </Tab.Navigator>
    </NavigationContainer>

    );
}

export default MainContainer;