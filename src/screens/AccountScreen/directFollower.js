import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import PropTypes from 'deprecated-react-native-prop-types';
import {AppContext} from '../../navigation/AppNavigation';

// Sample data of people you are follower
const followerData = [
  {id: 1, name: 'User1', profilePic: require('../../assets/images/User1.jpg')},
  {id: 2, name: 'User2', profilePic: require('../../assets/images/User2.jpg')},
  {id: 3, name: 'User3', profilePic: require('../../assets/images/User3.jpg')},
  {id: 4, name: 'User4', profilePic: require('../../assets/images/User1.jpg')},
  {id: 5, name: 'User5', profilePic: require('../../assets/images/User2.jpg')},
  {id: 6, name: 'User6', profilePic: require('../../assets/images/User3.jpg')},
  {id: 7, name: 'User7', profilePic: require('../../assets/images/User1.jpg')},
  {id: 8, name: 'User8', profilePic: require('../../assets/images/User2.jpg')},
  {id: 9, name: 'User9', profilePic: require('../../assets/images/User3.jpg')},
  {
    id: 10,
    name: 'User10',
    profilePic: require('../../assets/images/User1.jpg'),
  },
  {
    id: 11,
    name: 'User11',
    profilePic: require('../../assets/images/User2.jpg'),
  },
  {
    id: 12,
    name: 'User12',
    profilePic: require('../../assets/images/User3.jpg'),
  },
  // Add more users as needed
];

// followerNum component to display the total number of users follower
const FollowerNum = ({followerCount}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const navigation = useNavigation();

  const backNav = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {/* <TouchableOpacity onPress={backNav}>
        <Image
          source={require('../../assets/icon/backbtn.png')}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity> */}
      <View style={styles.headerTextContainer}>
        <Image
          style={styles.headerImage}
          source={
            colorTheme === 'Dark'
              ? require('../../assets/icon/follow.png')
              : require('../../assets/icon/followLight.png')
          }
        />
        <Text
          style={
            colorTheme === 'Dark'
              ? styles.headerTextDark
              : styles.headerTextLight
          }>
          People who follow you {'\n'}
        </Text>
      </View>

      <Text
        style={
          colorTheme === 'Dark' ? styles.fNumTextDark : styles.fNumTextLight
        }>
        {followerCount}
      </Text>
    </View>
  );
};

const FollowerScreen = () => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  // State to hold the list of users
  const [follower, setFollower] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Simulating data fetching from backend
    setFollower(followerData);
  }, []);

  // Function to handle user click
  const handleUserClick = userId => {
    // Navigate to user profile or perform any other action
    console.log('Clicked user with ID:', userId);
  };

  // Render each user item in the list
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleUserClick(item.id)}>
      <ImageBackground
        source={
          colorTheme === 'Dark'
            ? require('../../assets/images/background.png')
            : require('../../assets/images/backgroundLight.jpg')
        }
        style={styles.imageBackground}>
        <View
          style={
            colorTheme === 'Dark'
              ? styles.itemContainerDark
              : styles.itemContainerLight
          }>
          <Image source={item.profilePic} style={styles.profilePic} />
          <Text
            style={
              colorTheme === 'Dark' ? styles.userNameDark : styles.userNameLight
            }>
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View
      style={
        colorTheme === 'Dark' ? styles.containerDark : styles.containerLight
      }>
      <FollowerNum followerCount={follower.length} />
      <FlatList
        data={follower}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    marginTop: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Set background color to grey
    paddingTop: 10,
  },
  containerLight: {
    marginTop: 0,
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.7)', // Set background color to grey
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
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
  headerTextDark: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    top: -15,
    right: 30,
  },
  headerTextLight: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    top: -15,
    right: 30,
  },
  fNumTextDark: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    top: 20,
    right: 150,
  },
  fNumTextLight: {
    fontSize: 30,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    top: 20,
    right: 150,
  },
  itemContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: 'rgba(0,0,0,0.7)',
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Radius of the shadow
    elevation: 5, // Android only
  },
  itemContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    // borderBottomColor: 'grey',
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // shadowColor: '#000', // Shadow color
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25, // Opacity of the shadow
    // shadowRadius: 3.84, // Radius of the shadow
    // elevation: 5, // Android only
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userNameDark: {
    fontSize: 18,
    color: 'white',
  },
  userNameLight: {
    fontSize: 18,
    color: `${process.env.REACT_APP_DARKTHEME}`,
  },
  headerImage: {
    width: 40,
    height: 40,
    top: 23,
    left: 70,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default FollowerScreen;
