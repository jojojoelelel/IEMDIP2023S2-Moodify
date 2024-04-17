import React, { useState, useContext } from 'react';
import { View, Switch, StyleSheet, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AppContext} from '../../navigation/AppNavigation';

const SScreen = () => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const initialUserData = [
    { label: 'Profile Info Visibility', value: true },
    { label: 'Color Theme', value: false },
    { label: 'Setting 3', value: false },
  ];

  const navigation = useNavigation();

  const backNav = () => {
    navigation.goBack();
  }

  const SignOut = () => {
    navigation.navigate('GettingStarted'); // Replace 'GettingStarted' with the actual screen name
  };

  const [userData, setUserData] = useState(initialUserData);

  const toggleSwitch = (index) => {
    if (index === 1) {
      if (colorTheme === 'Dark') {
        setColorTheme('Light')
      } else {
        setColorTheme('Dark')
      }
    }
    const newData = [...userData];
    newData[index].value = !newData[index].value;
    setUserData(newData);
  };

  const renderItem = ({ item, index }) => (
    <View style={colorTheme === 'Dark' ? styles.itemContainerDark : styles.itemContainerLight}>
      <View style={styles.item}>
        <Text style={colorTheme === 'Dark' ? styles.labelDark : styles.labelLight}>{item.label}</Text>
        <Switch
          trackColor={{ false: "#767577", true: colorTheme === 'Dark' ? '#bbe35f' : '#854194' }}
          onValueChange={() => toggleSwitch(index)}
          value={item.value}
          thumbColor={colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : `${process.env.REACT_APP_LIGHTACCENT}` }
        />
      </View>
    </View>
  );
  if (colorTheme === 'Dark') {
    return (
      <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* <TouchableOpacity onPress={backNav}>
            <Image
              source={require('../../assets/icon/backbtn.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity> */}
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
          />
          <TouchableOpacity onPress={SignOut} style={styles.signOutBtnDark}>
            <Text style={styles.signOutBtnTxtDark}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  } else {
    return (
      // <View style={styles.mainContainerLight}>
        <ImageBackground source={require('../../assets/images/backgroundLight.jpg')} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* <TouchableOpacity onPress={backNav}>
            <Image
              source={require('../../assets/icon/backbtn.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity> */}
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
          />
          <TouchableOpacity onPress={SignOut} style={styles.signOutBtnLight}>
            <Text style={styles.signOutBtnTxtLight}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
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
  mainContainerLight: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  itemContainerDark: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
  },
  itemContainerLight: {
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
    borderRadius: 10,
    marginBottom: 10,
    // elevation: 3,
    marginTop: 10,
    borderWidth: 1,
    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  labelDark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  labelLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontWeight: 'bold',
    fontSize: 17,
  },
  signOutBtnDark: {
    backgroundColor: '#A4EC0A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom:'40%',
    alignItems: 'center',
  },
  signOutBtnLight: {
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom:'40%',
    alignItems: 'center',
  },
  signOutBtnTxtDark: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signOutBtnTxtLight: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SScreen;