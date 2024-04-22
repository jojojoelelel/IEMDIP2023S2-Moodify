import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {pxToDp} from '../../utils/stylesKits';
import {useNavigation} from '@react-navigation/native';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api';

import { AppContext } from '../../navigation/AppNavigation';

const PIscreen = () => {
  const { access_token, setaccess_token, colorTheme, setColorTheme } = useContext(AppContext);

  const initialUserData = [
    {label: 'Account Name', value: 'Andy'},
    {label: 'Country', value: 'SG'},
    {label: 'Email', value: 'Andy@example.com'},
    {label: 'Phone', value: '+1234567890'},
    {label: 'Date of Birth', value: '1990-01-01'},
  ];

  const navigation = useNavigation();

  const backNav = () => {
    navigation.goBack();
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (text, index) => {
    const updatedUserData = [...userData];
    updatedUserData[index].value = text;
    setUserData(updatedUserData);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const getCurrentUserProfile2 = async () => {
    try {
      const response = await SpotifyAPI.getCurrentUserProfile(access_token);
      handleInputChange(response.display_name, 0);
      handleInputChange(response.country, 1);
      handleInputChange(response.email, 2);
    } catch (error) {
      // console.error('Error in getCurrentUserProfile => ', error);
    }
  };

  useEffect(() => {
    getCurrentUserProfile2();
  }, []);

  const renderItem = ({item, index}) => (
    <View style={colorTheme === 'Dark' ? styles.itemContainerDark : styles.itemContainerLight}>
      <View style={styles.item}>
        <Text style={colorTheme === 'Dark' ? styles.labelDark : styles.labelLight}>{item.label}:</Text>
        {isEditing ? (
          <TextInput
            style={colorTheme === 'Dark' ? styles.inputDark : styles.inputLight}
            value={userData[index].value}
            onChangeText={text => handleInputChange(text, index)}
          />
        ) : (
          <Text style={colorTheme === 'Dark' ? styles.valueDark : styles.valueLight}>{item.value}</Text>
        )}
      </View>
    </View>
  );
  if (colorTheme === 'Dark') {
    return (
      <ImageBackground
        source={require('../../assets/images/background-DARKMODE-2.png')}
        style={styles.mainContainer}>
        {/* <ScrollView contentContainerStyle={styles.container}> */}
          {/* <TouchableOpacity onPress={backNav}>
            <Image
              source={require('../../assets/icon/backbtn.png')} // Replace 'path_to_your_image.png' with the actual path to your image
              style={{width: 50, height: 50}} // Adjust the width and height according to your preference
            />
          </TouchableOpacity> */}
          <Image
            source={require('../../assets/icon/profile.jpg')}
            style={styles.profileImage}
          />
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={item => item.label}
          />
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButtonDark}>
            <Text style={styles.editButtonTextDark}>
              {isEditing ? 'Save Changes' : 'Update Profile Info'}
            </Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
      </ImageBackground>
    );
  } else { // light mode
    return (
      // <View style={styles.mainContainerLight}>
        <ImageBackground source={require('../../assets/images/backgroundLight.jpg')} style={styles.mainContainer}>
        {/* <ScrollView contentContainerStyle={styles.container}> */}
          {/* <TouchableOpacity onPress={backNav}>
            <Image
              source={require('../../assets/icon/backbtn.png')} // Replace 'path_to_your_image.png' with the actual path to your image
              style={{width: 50, height: 50}} // Adjust the width and height according to your preference
            />
          </TouchableOpacity> */}
          <Image
            source={require('../../assets/icon/profile.jpg')}
            style={styles.profileImage}
          />
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={item => item.label}
          />
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButtonLight}>
            <Text style={styles.editButtonTextLight}>
              {isEditing ? 'Save Changes' : 'Update Profile Info'}
            </Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
      {/* </View> */}
      </ImageBackground>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 40,
  },
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  profileImage: {
    height: pxToDp(80),
    width: pxToDp(80),
    borderRadius: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  itemContainerDark: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  itemContainerLight: {
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor:`${process.env.REACT_APP_LIGHTACCENT}`,
    // elevation: 3,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
  },
  labelDark: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 15,
  },
  labelLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 15,
  },
  valueDark: {
    color: 'white',
    flex: 1,
    fontSize: 15,
  },
  valueLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    flex: 1,
    fontSize: 15,
  },
  editButtonDark: {
    // backgroundColor: '#A4EC0A',
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 130,
  },
  editButtonLight: {
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 130,
  },
  editButtonTextDark: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButtonTextLight: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDark: {
    flex: 1,
    fontSize: 15,
    padding: 0,
    borderRadius: 5,
    color: '#A4EC0A',
    elevation: 3,
  },
  inputLight: {
    flex: 1,
    fontSize: 15,
    padding: 0,
    borderRadius: 5,
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
    elevation: 3,
  },
});

export default PIscreen;
