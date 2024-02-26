import React, { useState } from 'react';
import {StyleSheet, FlatList, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView, Alert, Pressable } from 'react-native';
import { pxToDp } from '/Users/sneha.m7/Moodify/utils/stylesKits.js'; //Transform dimensions to fit screen
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import * as ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  circleContainer: {
    flexDirection: 'column',
    width: pxToDp(60),
    height: pxToDp(180),
    alignSelf: 'flex-end',
    marginRight: '5%'
  },
  box: { //style for icon container
    width: '30.4%',
    aspectRatio: 1, // Ensures a square box
    margin: '1.3%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    marginRight: 7,
  },
  circle: { //style for following,follower and hours
    height: pxToDp(47),
    width: pxToDp(47),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#A4EC0A',
    marginBottom: 10,
    marginTop: 2
  },
  imageBackground: { //style for icons
    width: '78.4%',
    height: '75%', // Ensures a square box
    margin: '1.3%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
    marginLeft: 20,
    marginTop: 30 // Center the icon within the box
  },
});

//Circle refers to following, follower, hours' containers, Box refers to icon containers

const boxNames = ["MyPlaylist", "Album", "Diary", "Downloads", "Profile Info", "Setting", "Deluxe", "About", "Logout"];
const boxData = boxNames.map((name, index) => ({ key: `Box ${index + 1}`, name }));
const circleNames = ["Following", "Follower", "Hours"];
circleVar = [1, 2, 3]; // to be replaced by database numbers
const circleData = circleNames.map((name, index) => ({
  key: `Circle ${index + 1}`,
  name: name,
  variable: circleVar[index]
}));

const AccountScreen = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Andy');
  const [profilePhoto, setProfilePhoto] = useState(require('/Users/sneha.m7/Moodify/assets/icon/profile.jpg'));

  /*const launchImageLibrary = () => {

    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

      ImagePicker.launchImageLibrary(options,(response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setProfilePhoto({ uri: response.uri });
        }
      });
    };*/

  const tempBoxHandler = (item) => {
    switch (item.name) {
      case "Album":
        navigation.navigate('AB'); //Navigate to Monicka's screen
        break;
      case "MyPlaylist":
        navigation.navigate('MyPlaylists'); //Navigate to Monicka's screen
        break;

      case "Profile Info":
        navigation.navigate('PIScreen');
        break;

      case "Logout":
        navigation.navigate('SignInScreen');
        //Logic for user logout
        break;

      case "Setting":
        navigation.navigate('SScreen');
        break;

      case "Diary":
        break;
      default:
        alert("Null");
        break;
    }
    // TO-DO#1: logic for each cell to be added here [DONE], add in each screen logic later
  };

  const tempCircleHandler = (item) => {
    switch (item.name) {
      case "Following":
        navigation.navigate('FollowingScreen'); //for testing purpose, to be replaced by following list screen
        break;
      case "Follower":
        navigation.navigate('FollowerScreen'); //for testing purpose, to be replaced by follower list screen
        break;
      default:
        break;
    }
    // TO-DO#1: logic for each cell to be added here [DONE]
  };


  const getIconSource = (name) => {
    switch (name) {
      case "MyPlaylist":
        return require('/Users/sneha.m7/Moodify/assets/icon/playlist.png');
      case "Album":
        return require('/Users/sneha.m7/Moodify/assets/icon/album.png');
      case "Diary":
        return require('/Users/sneha.m7/Moodify/assets/icon/diary.png');
      case "Profile Info":
        return require('/Users/sneha.m7/Moodify/assets/icon/changeprofile.png');
      case "Setting":
        return require('/Users/sneha.m7/Moodify/assets/icon/settings.png');
      case "Logout":
        return require('/Users/sneha.m7/Moodify/assets/icon/logout.png');
      case "Downloads":
        return require('/Users/sneha.m7/Moodify/assets/icon/download.png');
      case "Logout":
        return require('/Users/sneha.m7/Moodify/assets/icon/logout.png');
      case "About":
        return require('/Users/sneha.m7/Moodify/assets/icon/about.png');
      default:
        // Default icon if no match found
        return require('/Users/sneha.m7/Moodify/assets/icon/deluxe.png');
    }
  };

  const renderBox = ({ item }) => ( //render icons
    <TouchableOpacity onPress={() => tempBoxHandler(item)} style={styles.box}>
      <ImageBackground source={getIconSource(item.name)} style={styles.imageBackground}></ImageBackground>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginTop: -15, fontSize: 13, color: 'white' }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCircle = ({ item }) => ( //render following section
    <TouchableOpacity onPress={() => tempCircleHandler(item)} style={styles.circle}>
      <View style={{ marginBottom: 5 }}>
        <Text style={{ color: 'black', bottom: -10, fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>{item.variable}</Text>
      </View>
      <View><Text style={{ color: 'white', top: 10, fontSize: 11, textAlign: 'center' }}>{item.name}</Text></View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('/Users/sneha.m7/Moodify/assets/images/background.png')} style={{ flex: 1 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
           marginHorizontal: 15,
           marginTop: 10,
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      <View style={{ height: '100%', alignItems: 'center' }}>
        <View style={{
          height: pxToDp(200),
          width: '95%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          marginTop: '5%',
          padding: 12,
          elevation: 5,
          borderRadius: 10,
          shadowColor: '#303133',
          flexDirection: 'column'
        }}>

          <FlatList
            data={circleData}
            renderItem={renderCircle}
            keyExtractor={(item) => item.key}
            numColumns={1}
            contentContainerStyle={styles.circleContainer}
            style={{ height: pxToDp(300), alignSelf: 'flat-end' }} />
          <View style={{
            height: '55%',
            width: '80%',
            marginLeft: '10%',
            flexDirection: 'column',
            marginTop: '-35%'
          }}>

              <Image source={profilePhoto} style={{
                height: pxToDp(80),
                width: pxToDp(80),
                borderRadius: 120,
                marginTop:'-15%',
                marginBottom:'15%',
                marginLeft:'19%'
              }} />

            <View style={{
              marginTop: '-7%',
            }}>
              <TextInput
                placeholder={'Andy'}
                editable={false}
                onChangeText={text => setName(text)}
                value={name}
                style={{
                  width: '70%',
                  textAlign: 'center',
                  alignSelf: 'flex-start',
                  color:'black',
                  backgroundColor: '#A4EC0A',
                }}
              />
            </View>
          </View>
          <View style={{
            width: '80%',
            marginTop: '5%',
            alignSelf: 'center',
            opacity: 0.3,
            backgroundColor: '#606266',
          }} />


 </View>
        <View style={{
          height: '60%',
          width: '95%',
          padding: 10,
          marginTop: '5%',
          elevation: 5,
          borderRadius: 10,
          shadowColor: '#303133',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <FlatList
              data={boxData}
              renderItem={renderBox}
              keyExtractor={(item) => item.key}
              numColumns={3}
              contentContainerStyle={styles.container}
            />
          </View>
          <View style={{
            width: '90%',
            alignSelf: 'center',
            opacity: 0.3,
            backgroundColor: '#606266',
          }} />
        </View>
      </View>
    </ImageBackground>
  )
};

export default AccountScreen;