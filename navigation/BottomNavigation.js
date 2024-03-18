import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//App Screens
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import AccountScreen from './screens/AccountScreen/AccountScreen';

// Home screen
import SearchScreen from './screens/SearchScreen';

// Discover screen
import ChatBotScreen from './screens/ChatBotScreen';

// Account screen
import PlaylistsScreen from './screens/AccountScreen/MyPlaylistScreen';
import PlaylistDetailsScreen from './screens/AccountScreen/PlaylistDetailsScreen';
import FollowingScreen from './screens/AccountScreen/directFollowing';
import FollowerScreen from './screens/AccountScreen/directFollower';
import PIscreen from './screens/AccountScreen/directProfileInfo';
import SScreen from './screens/AccountScreen/directSetting';
import FullMusicPlayerScreen from './screens/MusicPlayerScreen/FullMusicPlayerScreen';
import MusicDiaryScreen from './screens/AccountScreen/directDiary';

// Screen names
const homeName = "Home";
const discoverName = "Discover";
const accountName = "Account";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigation = () => {
  return (
<Tab.Navigator
  initialRouteName={homeName}
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === homeName) {
        iconName = focused
          ? require('/Users/sneha.m7/Moodify/assets/icon/house_green.png')
          : require('/Users/sneha.m7/Moodify/assets/icon/house_white.png');
      } else if (route.name === discoverName) {
        iconName = focused
          ? require('/Users/sneha.m7/Moodify/assets/icon/light_green.png')
          : require('/Users/sneha.m7/Moodify/assets/icon/light_white.png');
      } else if (route.name === accountName) {
        iconName = focused
          ? require('/Users/sneha.m7/Moodify/assets/icon/person_green.png')
          : require('/Users/sneha.m7/Moodify/assets/icon/person_white.png');
      }
      // You can return any component that you like here!
      return <Image source={iconName} style={{ width: 24, height: 24, resizeMode: 'contain' }} />;
    },
    tabBarActiveTintColor: '#CBFB5E',
    tabBarInactiveTintColor: 'white',
    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
    tabBarStyle: { padding: 10, height: 70, backgroundColor: 'black' },
  })}
>
  <Tab.Screen name={homeName} component={HomeScreen} />
  <Tab.Screen name={discoverName} component={DiscoverScreen} />
  <Tab.Screen name={accountName} component={AccountScreen} />
</Tab.Navigator>
  );
  }
        function HomeStackNavigator() {
          return (
          <Stack.Navigator>
          <Stack.Screen name = 'Home Screen' component={HomeScreen} options={{tabBarLabel: "Home", headerShown: false}}/>
          <Stack.Screen name = 'SearchScreen' component={SearchScreen} />
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
         function AccountNavigator() {
            return (
           <Stack.Navigator>
           <Stack.Screen name = 'AccountScreen' component={AccountScreen}/>
           <Stack.Screen name="MyPlaylists" component={MyPlaylistScreen} />
           <Stack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} />
           <Stack.Screen name="FollowingScreen" component={FollowingScreen} options={{headerShown: false}}/>
           <Stack.Screen name="FollowerScreen" component={FollowerScreen} options={{headerShown: false}} />
           <Stack.Screen name="AccountScreen" component={AccountScreen} options={{headerShown: false}}/>
           <Stack.Screen name="PIScreen" component={PIscreen} options={{headerShown: false}}/>
           <Stack.Screen name="SScreen" component={SScreen} options={{headerShown: false}}/>
           <Stack.Screen name="FullMusicPlayerScreen" component={FullMusicPlayerScreen} />
           <Stack.Screen name="MusicDiaryScreen" component={MusicDiaryScreen} />
           </Stack.Navigator>
         );
}

export default BottomNavigation;


