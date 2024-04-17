import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {pxToDp} from '../../utils/stylesKits'; //Transform dimensions to fit screen
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../AccountScreen/AuthContext';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api';
import {updatePassword} from 'firebase/auth';

import {AppContext} from '../../navigation/AppNavigation';
import MusicPlayerBar from '../../components/MusicPlayerBar';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  mainContainerLight:{
    flex: 1,
    flexDirection: 'column',
    // height: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
    paddingBottom: '4%',
  },
  circleContainer: {
    flexDirection: 'column',
    width: pxToDp(60),
    height: pxToDp(205),
    alignSelf: 'flex-end',
    marginRight: '5%',
    top: 8,
  },
  box: {
    //style for icon container
    width: '30.4%',
    aspectRatio: 1, // Ensures a square box
    margin: '1.3%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    marginRight: 7,
  },
  circle: {
    //style for following,follower and hours
    height: pxToDp(47),
    width: pxToDp(47),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    marginTop: 2,
  },
  imageBackground: {
    //style for icons
    width: '78.4%',
    height: '75%', // Ensures a square box
    margin: '1.3%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
    marginLeft: 20,
    marginTop: 30, // Center the icon within the box
  },
});

//Circle refers to following, follower, hours' containers, Box refers to icon containers

const boxNames = [
  'MyPlaylist',
  'Album',
  'Diary',
  'LikedSongs',
  'Player',
  'Artists',
];
const boxData = boxNames.map((name, index) => ({
  key: `Box ${index + 1}`,
  name,
}));

const initialFollowInfo = [
  {name: 'Following', count: 0},
  {name: 'Follower', count: 0},
  {name: 'Hours', count: 0},
];

const AccountScreen = () => {
  const navigation = useNavigation();
  const {access_token, setaccess_token, colorTheme, setColorTheme} = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState();
  const [profilePhoto, setProfilePhoto] = useState(' ');
  const [followInfo, setFollowInfo] = useState(initialFollowInfo); // to be replaced by database numbers
  const circleData = followInfo.map((name, index) => ({
    key: `Circle ${index + 1}`,
    name: name,
  }));

  const spotifyApi = new SpotifyWebApi();

  const setFollower = num => {
    circleVar[1] = num;
  };

  const updateFollowInfo = (index, newCount) => {
    setFollowInfo(prevData => {
      const newData = [...prevData];
      newData[index].count = newCount;
      return newData;
    });
  };

  // const access_token = access_token2;
  let imgurl = '123';
  const getCurrentUserProfile2 = async () => {
    try {
      const response = await SpotifyAPI.getCurrentUserProfile(access_token);
      setName(response.display_name);
      updateFollowInfo(1, response.followers.total);
      setProfilePhoto(response.images[0].url);
      console.log(profilePhoto);
      console.log(response.images[0].url);
      imgurl = response.images[0].url;
      console.log(imgurl);
    } catch (error) {
      console.error('Error in getCurrentUserProfile => ', error);
    }
  };

  useEffect(() => {
    getCurrentUserProfile2();
  }, []);

  const getFollowedArtists2 = async () => {
    try {
      const response = await SpotifyAPI.getFollowedArtists(access_token, 5);
      //updateFollowInfo(0,response.artists.total);
    } catch (error) {
      console.error('Error in getFollowedArtists => ', error);
    }
  };

  useEffect(() => {
    getFollowedArtists2();
  }, []);

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

  const tempBoxHandler = item => {
    switch (item.name) {
      case 'Album':
        navigation.navigate('AB'); //Navigate to Monicka's screen
        break;
      case 'MyPlaylist':
        navigation.navigate('MyPlaylists'); //Navigate to Monicka's screen
        break;

      case 'Profile Info':
        navigation.navigate('PIScreen');
        break;

      case 'Logout':
        navigation.navigate('SignInScreen');
        //Logic for user logout
        break;

      case 'Setting':
        navigation.navigate('SScreen');
        break;

      case 'Diary':
        navigation.navigate('DiaryScreen');
        break;

      case 'Player':
        navigation.navigate('MusicPlayerScreen');
        break;

      case 'LikedSongs':
        navigation.navigate('LikedSongsScreen');
        break;

      default:
        alert('Null');
        break;
    }
    // TO-DO#1: logic for each cell to be added here [DONE], add in each screen logic later
  };

  const editProfile = () => {
    navigation.navigate('PIScreen');
  };

  const goSettings = () => {
    navigation.navigate('SScreen');
  };

  const tempCircleHandler = item => {
    switch (item.name.name) {
      case 'Following':
        navigation.navigate('FollowingScreen'); //for testing purpose, to be replaced by following list screen
        break;
      case 'Follower':
        navigation.navigate('FollowerScreen'); //for testing purpose, to be replaced by follower list screen
        break;
      //for testing purpose, to be replaced by follower list screen
      default:
        break;
    }
    // TO-DO#1: logic for each cell to be added here [DONE]
  };

  const getIconSource = name => { // icons here
    switch (name) {
      case 'MyPlaylist':
        return colorTheme === 'Dark' ? require('../../assets/icon/playlist.png') : require('../../assets/icon/playlistLight.png');
      case 'Album':
        return colorTheme === 'Dark' ? require('../../assets/icon/album.png') : require('../../assets/icon/albumLight.png');
      case 'Diary':
        return colorTheme === 'Dark' ? require('../../assets/icon/diary.png') : require('../../assets/icon/diaryLight.png');
      case 'Profile Info':
        return colorTheme === 'Dark' ? require('../../assets/icon/changeprofile.png') : require('../../assets/icon/changeprofileLight.png');
      case 'Setting':
        return colorTheme === 'Dark' ? require('../../assets/icon/settings.png') : require('../../assets/icon/settingsLight.png');

      case 'LikedSongs':
        return colorTheme === 'Dark' ? require('../../assets/icon/likedSong.png') : require('../../assets/icon/likedSongLight.png');

      case 'Player':
        return colorTheme === 'Dark' ? require('../../assets/icon/play.png') : require('../../assets/icon/playLight.png');

      case 'Artists':
        return colorTheme === 'Dark' ? require('../../assets/icon/artist.png') : require('../../assets/icon/artistLight.png');

      default:
        // Default icon if no match found
        return colorTheme === 'Dark' ? require('../../assets/icon/settings.png') : require('../../assets/icon/settingsLight.png');
    }
  };

  const renderBox = (
    {item}, //render icons
  ) => (
    <TouchableOpacity onPress={() => tempBoxHandler(item)} style={styles.box}>
      <ImageBackground
        source={getIconSource(item.name)}
        style={styles.imageBackground}></ImageBackground>
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            marginTop: -15,
            fontSize: 13,
            color: colorTheme === 'Dark' ? 'white' : `${process.env.REACT_APP_DARKTHEME}`,
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCircle = (
    {item}, //render following section
  ) => (
    <TouchableOpacity
      onPress={() => tempCircleHandler(item)}
      style={styles.circle}>
      <View style={{marginBottom: 5}}>
        <Text
          style={{
            color: 'black',
            bottom: -10,
            fontSize: 23,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item.name.count}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: colorTheme === 'Dark' ? 'white' : `${process.env.REACT_APP_DARKTHEME}`,
            top: 12,
            fontSize: 11,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item.name.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  if (colorTheme === 'Dark') {
    return (
      <ScrollView>
        <ImageBackground style={styles.mainContainerLight} source={require('../../assets/images/background.png')}>
            <View // top card 
              style={{
                // height: pxToDp(250),
                marginTop: '10%',
                width: '95%',
                height: '38%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                // marginTop: '4%',
                padding: 12,
                elevation: 5,
                borderRadius: 10,
                shadowColor: '#303133',
                flexDirection: 'column',


              }}>
              <TouchableOpacity // Settings Button
                style={{position: 'absolute', top: 20, left: 20, zIndex: 999}}
                onPress={goSettings}>
                <Image
                  source={require('../../assets/icon/settings.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
  
              <FlatList
                data={circleData}
                renderItem={renderCircle}
                keyExtractor={item => item.key}
                numColumns={1}
                contentContainerStyle={styles.circleContainer}
                style={{height: pxToDp(300), alignSelf: 'flat-end'}}
              />
              <View
                style={{
                  height: '55%',
                  width: '80%',
                  marginLeft: '10%',
                  flexDirection: 'column',
                  marginTop: '-35%',
                }}>
                <Image // profile pic
                  source={{
                    uri: 'https://i.scdn.co/image/ab67757000003b820a5d7357397748b0af130608',
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 120,
                    marginTop: '-15%',
                    marginBottom: '15%',
                    marginLeft: '19%',
                  }}
                />
  
                <View
                  style={{
                    marginTop: '-7%',
                  }}>
                  <TextInput
                    placeholder={name}
                    editable={false}
                    onChangeText={text => setName(text)}
                    value={name}
                    style={{
                      width: '70%',
                      textAlign: 'center',
                      alignSelf: 'flex-start',
                      color: 'white',
                      backgroundColor: 'rgba(200,200,200,0.4)',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}
                  />
                  <TouchableOpacity onPress={editProfile}>
                    <Image
                      source={require('../../assets/icon/editprofile.png')} // pencil icon edit
                      style={{width: 25, height: 25, marginLeft: '56%', top: -37}} // Adjust width and height as needed
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '80%',
                  marginTop: '5%',
                  alignSelf: 'center',
                  opacity: 0.3,
                  backgroundColor: '#606266',
                }}
              />
            </View>
            <View
              style={{
                // height: '43%',
                width: '95%',
                padding: 10,
                // marginTop: '5%',
                elevation: 5,
                borderRadius: 10,
                shadowColor: '#303133',
                backgroundColor: 'rgba(0,0,0,0.7)',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={boxData}
                  renderItem={renderBox}
                  keyExtractor={item => item.key}
                  numColumns={3}
                  contentContainerStyle={styles.container}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  opacity: 0.3,
                  backgroundColor: '#606266',
                }}
              />
            </View>
          </ImageBackground>
          <MusicPlayerBar />
      </ScrollView>
    );
  } else {
    return ( // light theme
      <ScrollView>
          {/* <View style={styles.mainContainerLight}> */}
          <ImageBackground source={colorTheme === 'Dark' ? require('../../assets/images/sign-in-bgDark.jpg') : require('../../assets/images/backgroundLight.jpg')}
      style={styles.mainContainerLight}>
            <View // top card 
              style={{
                // height: pxToDp(250),
                marginTop: '10%',
                height: '38%',
                width: '95%',
                // backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 12,
                // elevation: 2,
                borderRadius: 10,
                borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
                borderWidth: 1,
                // shadowColor: '#303133', 
                flexDirection: 'column',
              }}>
              <TouchableOpacity // Settings Button
                style={{position: 'absolute', top: 20, left: 20, zIndex: 999}}
                onPress={goSettings}>
                <Image
                  source={require('../../assets/icon/settingsLight.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
  
              <FlatList
                data={circleData}
                renderItem={renderCircle}
                keyExtractor={item => item.key}
                numColumns={1}
                contentContainerStyle={styles.circleContainer}
                style={{height: pxToDp(300), alignSelf: 'flat-end'}}
              />
              <View
                style={{
                  height: '55%',
                  width: '80%',
                  marginLeft: '10%',
                  flexDirection: 'column',
                  marginTop: '-35%',
                }}>
                <Image // profile pic
                  source={{
                    uri: 'https://i.scdn.co/image/ab67757000003b820a5d7357397748b0af130608',
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 120,
                    marginTop: '-15%',
                    marginBottom: '15%',
                    marginLeft: '19%',
                    borderWidth: 3,
                    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`
                  }}
                />
  
                <View
                  style={{
                    marginTop: '-7%',
                  }}>
                  <TextInput
                    placeholder={name}
                    editable={false}
                    onChangeText={text => setName(text)}
                    value={name}
                    style={{
                      width: '70%',
                      textAlign: 'center',
                      alignSelf: 'flex-start',
                      color: colorTheme === 'Dark' ? 'white' : `${process.env.REACT_APP_DARKTHEME}`,
                      backgroundColor: 'white',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}
                  />
                  <TouchableOpacity onPress={editProfile}>
                    <Image
                      source={require('../../assets/icon/editprofileLight.png')} // pencil icon edit
                      style={{width: 25, height: 25, marginLeft: '56%', top: -37}} // Adjust width and height as needed
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '80%',
                  marginTop: '5%',
                  alignSelf: 'center',
                  opacity: 0.3,
                  backgroundColor: '#606266',
                }}
              />
            </View>
            <View // bottom Card
              style={{ 
                // height: '43%',
                width: '95%',
                padding: 10,
                // marginTop: '5%',
                // elevation: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
                // shadowColor: '#303133',
                // backgroundColor: 'rgba(0,0,0,0.7)',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={boxData}
                  renderItem={renderBox}
                  keyExtractor={item => item.key}
                  numColumns={3}
                  contentContainerStyle={styles.container}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  opacity: 0.3,
                  backgroundColor: '#606266',
                }}
              />
            </View>
          {/* </View> */}
          </ImageBackground>
          <MusicPlayerBar />
      </ScrollView>
    );
  }
  
};

export default AccountScreen;
