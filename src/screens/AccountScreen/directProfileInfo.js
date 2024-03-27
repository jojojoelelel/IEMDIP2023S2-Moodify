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
  const { access_token, setaccess_token } = useContext(AppContext);

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

  // const access_token =
  //   'BQAWh17cj2uYCkuuKv7k_n3vs3mPdcoXt6Sh9NEcH7annd5f89YLCI3_Kfjd76OP7_fSL_a1XfKNVGlCnluKwFX22le99d9RAP4E20BOmQoPLq6heTS-Fhk0ZgsDfpGki91--VYa81--VzkWpcTE_BXBiDL-4u46WMK6l4ZScA9W9Xsrz6yPca28wmeC36xl8WwP3cvh5fOmUU1SXg_06h6rgZhpd1KZuIPO6VK3N18Dm1JlUFMIEuauvZUX';
  const getCurrentUserProfile2 = async () => {
    try {
      const response = await SpotifyAPI.getCurrentUserProfile(access_token);
      handleInputChange(response.display_name, 0);
      handleInputChange(response.country, 1);
      handleInputChange(response.email, 2);
    } catch (error) {
      console.error('Error in getCurrentUserProfile => ', error);
    }
  };

  useEffect(() => {
    getCurrentUserProfile2();
  }, []);

  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.label}>{item.label}:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData[index].value}
            onChangeText={text => handleInputChange(text, index)}
          />
        ) : (
          <Text style={styles.value}>{item.value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={backNav}>
          <Image
            source={require('../../assets/icon/backbtn.png')} // Replace 'path_to_your_image.png' with the actual path to your image
            style={{width: 50, height: 50}} // Adjust the width and height according to your preference
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/icon/profile.jpg')}
          style={styles.profileImage}
        />
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={item => item.label}
        />
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save Changes' : 'Update Profile Info'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 40,
  },
  profileImage: {
    height: pxToDp(80),
    width: pxToDp(80),
    borderRadius: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 15,
  },
  value: {
    color: 'white',
    flex: 1,
    fontSize: 15,
  },
  editButton: {
    backgroundColor: '#A4EC0A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 130,
  },
  editButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
    borderRadius: 5,
    color: '#A4EC0A',
    elevation: 3,
  },
});

export default PIscreen;
