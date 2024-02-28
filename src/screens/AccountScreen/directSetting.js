import React, { useState } from 'react';
import { View, Switch, StyleSheet, FlatList, Image, ImageBackground, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SScreen = () => {
  const initialUserData = [
    { label: 'Profile Info Visibility', value: true },
    { label: 'Setting 2', value: false },
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
    const newData = [...userData];
    newData[index].value = !newData[index].value;
    setUserData(newData);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.label}>{item.label}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#A4EC0A" }}
          onValueChange={() => toggleSwitch(index)}
          value={item.value}
        />
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={backNav}>
          <Image
            source={require('../../assets/icon/backbtn.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
        />
        <TouchableOpacity onPress={SignOut} style={styles.signOutBtn}>
          <Text style={styles.signOutBtnTxt}>Sign Out</Text>
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
  itemContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  signOutBtn: {
    backgroundColor: '#A4EC0A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom:'40%',
    alignItems: 'center',
  },
  signOutBtnTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SScreen;
