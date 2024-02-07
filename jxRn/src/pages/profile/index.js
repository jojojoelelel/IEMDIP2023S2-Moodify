import React, { Component, useState }  from 'react';
import {StyleSheet,FlatList, Text, View, Dimensions, Image, Button, TouchableOpacity, ImageBackground, TextInput, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {pxToDp} from '../../utils/stylesKits';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
    },
    circleContainer:{
        flexDirection:'column',
        width:pxToDp(60),
        height:pxToDp(180),
        alignSelf: 'flex-end',
        marginRight:'5%'
    },
    box: {
      width: '30.4%',
      aspectRatio: 1, // Ensures a square box
      margin: '1.3%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#000',
      alignSelf:'center',
      marginVertical: 8,
    },
    circle:{
        height: pxToDp(53.5),
        width: pxToDp(53.5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor:'purple',
        marginBottom:10
        
    }
  });

const boxNames = ["MyPlaylist", "Album", "Diary", "Downloads", "Profile Info", "Setting", "Deluxe", "Notifications", "About"];
const boxData = boxNames.map((name, index) => ({ key: `Box ${index + 1}`, name }));
const circleNames = ["Following", "Follower", "Hours"];
circleVar=[1,2,3];
const circleData = circleNames.map((name, index) => ({
    key: `Circle ${index + 1}`,
    name: name,
    variable: circleVar[index]}));
const tempBoxHandler = () => {
    alert('function is null')
    // TO-DO#1: logic for each cell to be added here
  };

  const renderBox = ({ item }) => (
    <TouchableOpacity onPress={() => tempBoxHandler()} style={styles.box}>
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderCircle = ({ item }) => (
    <TouchableOpacity onPress={() => tempBoxHandler()} style={styles.circle}>
      <View>
        <Text style={{color:'white',marginBottom:0.4,fontSize:23,textAlign:'center',fontWeight:'bold'}}>{item.variable}</Text>
        <Text style={{color:'white',marginTop:0.2,fontSize:10,textAlign:'center'}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ProfileInfo extends Component {
   constructor() {
       super();
       this.state = {
           isEditing:             false,

           name:                   'Andy',
           profilePhoto:            require('../../../icon/profile.jpg'),
       }
   }

   render() {
       return(
           <View style={{
               height: '100%',
               alignItems: 'center',
               backgroundColor: 'pink',
           }}>
               <View style={{
                   height: pxToDp(200),
                   width: '95%',
                   backgroundColor: 'white',
                   marginTop: '15%',
                   padding: 12,
                   elevation: 5,
                   borderRadius: 10,
                   shadowColor: '#303133',
                   flexDirection:'column'
               }}>
                    
                    <FlatList
                        data={circleData}
                        renderItem={renderCircle}
                        keyExtractor={(item) => item.key}
                        numColumns={1}
                        contentContainerStyle={styles.circleContainer}
                        style={{ height: pxToDp(300), alignSelf: 'flat-end' }}/>
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
                               marginTop:'-10%',}}>
                            <Image source={this.state.profilePhoto} style={{
                                height: pxToDp(80),
                                width: pxToDp(80),
                                borderRadius: 120,
                            }}/>
                       </TouchableOpacity>
                       
                       <View style={{
                           marginTop: '3%',
                           
                       }}>
                           <TextInput
                               placeholder={this.state.name}
                               editable={true}
                               selectionColor={'blue'}
                               onChangeText={
                                   text => this.setState({
                                       name: text
                                   })
                               }
                               value={this.state.name}
                               style={{
                                   width: '70%',
                                   backgroundColor:'grey',
                                   textAlign:'center',
                                   alignSelf:'flex-start'
                               }}
                           />
                       </View>
                   </View>
                   <View style={{
                       width: '80%',                      
                       marginTop: '5%',
                       alignSelf:'center',
                       opacity: 0.3,
                       backgroundColor: '#606266',
                   }} />
               </View>
               <View style={{
                   height: '50%',
                   width: '95%',
                   padding: 10,
                   marginTop: '5%',
                   elevation: 5,
                   borderRadius: 10,
                   shadowColor: '#303133',
                   backgroundColor: 'white',
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
                           alignSelf:'center',
                           opacity: 0.3,
                           backgroundColor: '#606266',
                       }} />
                       <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}>
                       </View>
                       <View/>
                       <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}>
                       </View>
                       <View/>
                       <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}>                         
                       </View>
                       <View/>
                       <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}>                      
                       </View>
                       <View/>
                       <View style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                       }}>
                       </View>
                       <View/>
                   <View style={{
                       height: '10%',
                   }}></View>
                   <View style={{
                       flexDirection: 'row',
                       alignItems: 'center',
                   }}>
                   </View>
                   <View style={{
                       height: '5%',
                   }}></View>
               </View>
           </View>
       )
   }
};


