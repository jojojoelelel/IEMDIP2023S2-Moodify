import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StyleSheet, FlatList, Image, ImageBackground, ScrollView } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

const PIscreen = () => {
  const initialUserData = [
    { label: 'Account Name', value: 'Andy' },
    { label: 'Gender', value: 'Male' },
    { label: 'Email', value: 'Andy@example.com' },
    { label: 'Phone', value: '+1234567890' },
    { label: 'Date of Birth', value: '1990-01-01' },
  ];

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

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.label}>{item.label}:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData[index].value}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ) : (
          <Text style={styles.value}>{item.value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../../../image/background.png')} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../../icon/profile.jpg')} style={styles.profileImage} />
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
        />
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save Changes' : 'Update Profile Info'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop:40,
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
    fontSize: 15
  },
  editButton: {
    backgroundColor: '#A4EC0A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom:130,
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
