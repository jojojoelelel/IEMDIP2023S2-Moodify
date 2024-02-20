import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'; //newly added
import CustomButton from '../../components/CustomButton'; //imported ahn's button

const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello, account screen here</Text>

      {/* CustomButton to navigate to Playlists Screen */}
      <CustomButton
        title="My Playlists"
        onPress={() => navigation.navigate('MyPlaylists')} // Match the screen name
      />
      
      {/* Placeholder for CustomButton to navigate to Albums Screen */}
      {/* <CustomButton
        title="My Albums"
        onPress={() => navigation.navigate('MyAlbums')} // Replace 'MyAlbums' with actual screen name
      /> */}
      
      {/* Placeholder for CustomButton to navigate to Artists Screen */}
      {/* <CustomButton
        title="My Artists"
        onPress={() => navigation.navigate('MyArtists')} // Replace 'MyArtists' with actual screen name
      /> */}
    </View>
  );
};

export default AccountScreen;