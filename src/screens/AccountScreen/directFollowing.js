import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample data of people you are following
const followingData = [
  { id: 1, name: 'User1', profilePic: require('../../assets/images/User1.jpg') },
  { id: 2, name: 'User2', profilePic: require('../../assets/images/User2.jpg') },
  { id: 3, name: 'User3', profilePic: require('../../assets/images/User3.jpg') },
  { id: 4, name: 'User4', profilePic: require('../../assets/images/User1.jpg') },
  { id: 5, name: 'User5', profilePic: require('../../assets/images/User2.jpg') },
  { id: 6, name: 'User6', profilePic: require('../../assets/images/User3.jpg') },
  { id: 7, name: 'User7', profilePic: require('../../assets/images/User1.jpg') },
  { id: 8, name: 'User8', profilePic: require('../../assets/images/User2.jpg') },
  { id: 9, name: 'User9', profilePic: require('../../assets/images/User3.jpg') },
  { id: 10, name: 'User10', profilePic: require('../../assets/images/User1.jpg') },
  { id: 11, name: 'User11', profilePic: require('../../assets/images/User2.jpg') },
  { id: 12, name: 'User12', profilePic: require('../../assets/images/User3.jpg') },
  // Add more users as needed
];

// FollowingNum component to display the total number of users following
const FollowingNum = ({ followingCount }) => {
  const navigation = useNavigation();

  const backNav = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={backNav}>
        <Image
          source={require('../../assets/icon/backbtn.png')}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Image style={styles.headerImage}
          source={require('../../assets/icon/follow.png')} // Add the path to your image
          
        />
        <Text style={styles.headerText}>People you are following {'\n'}</Text>
      </View>
      <Text style={styles.fNumText}>{followingCount}</Text>
    </View>
  );
};

const FollowingScreen = () => {
  // State to hold the list of users
  const [following, setFollowing] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Simulating data fetching from backend
    setFollowing(followingData);
  }, []);

  // Function to handle user click
  const handleUserClick = (userId) => {
    // Navigate to user profile or perform any other action
    console.log("Clicked user with ID:", userId);
  };

  // Render each user item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserClick(item.id)}>
      <View style={styles.itemContainer}>
        <Image source={item.profilePic} style={styles.profilePic} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FollowingNum followingCount={following.length} />
      <FlatList
        data={following}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: 'black', // Set background color to grey
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    top:-15,
    right:30
  },
  fNumText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    top:20,
    right:150
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: '#A4EC0A',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
  },
  headerImage:{
    width:40,
    height:40,
    top:23,
    left:70
  }
});

export default FollowingScreen;
