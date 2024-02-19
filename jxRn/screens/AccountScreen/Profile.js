
import React, { useState } from 'react';
import {StyleSheet, FlatList, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import { pxToDp } from '../../src/utils/stylesKits'; //Transform dimensions to fit screen
import { useNavigation } from '@react-navigation/native';

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
    marginRight: 7
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

const ProfileInfo = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Andy');
  const [profilePhoto, setProfilePhoto] = useState(require('../../icon/profile.jpg'));

  const tempBoxHandler = (item) => {
    switch (item.name) {
      case "Album":
        navigation.navigate('AB'); //Navigate to Monicka's screen 
        break;
      case "MyPlaylist":
        navigation.navigate('PL'); //Navigate to Monicka's screen
        break;

      case "Profile Info":
        navigation.navigate('PI');
        break;

      case "Logout":
        navigation.navigate('SignInScreen');
        //Logic for user logout
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
        navigation.navigate('AB'); //for testing purpose, to be replaced by following list screen
        break;
      case "Follower":
        navigation.navigate('PL'); //for testing purpose, to be replaced by follower list screen
        break;
      default:
        alert("Null");
        break;
    }
    // TO-DO#1: logic for each cell to be added here [DONE]
  };


  const getIconSource = (name) => {
    switch (name) {
      case "MyPlaylist":
        return require('../../icon/playlist.png');
      case "Album":
        return require('../../icon/album.png');
      case "Diary":
        return require('../../icon/diary.png');
      case "Profile Info":
        return require('../../icon/changeprofile.png');
      case "Setting":
        return require('../../icon/settings.png');
      case "Logout":
        return require('../../icon/logout.png');
      case "Downloads":
        return require('../../icon/download.png');
      case "Logout":
        return require('../../icon/logout.png');
      case "About":
        return require('../../icon/about.png');
      default:
        // Default icon if no match found
        return require('../../icon/deluxe.png');
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
    <ImageBackground source={require('../../image/background.png')} style={{ flex: 1 }}>
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

            <TouchableOpacity onPress={this.changeProfilePhotoButton}
              style={{
                alignSelf: 'flex-start',
                marginLeft: '18%',
                flexDirection: 'row',
                marginTop: '-10%',
              }}>
              <Image source={profilePhoto} style={{
                height: pxToDp(80),
                width: pxToDp(80),
                borderRadius: 120,
              }} />
            </TouchableOpacity>

            <View style={{
              marginTop: '3%',
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

export default ProfileInfo;
