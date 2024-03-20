import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Auth } from '../services'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Home = ({navigation}) => {

   
    const addData = () => {
        // adds a collection(if does not exist) and a document in that created collection
        firestore()
        .collection('Users')
        .add({
            name: 'test2',
            mobile: '1234567890',
            email:'test@gmail.com'
        })
        .then(() => {
            console.log('User added!');
        });
    }

    const setData = () => {
        // adds a collection with a specified id and a document in that created collection
        firestore()
        .collection('Users')
        .doc('Hello')
        .set({
            name: 'test1',
            mobile: '1234567890',
            email:'test@gmail.com'
        })
        .then(() => {
            console.log('User added!');
        });
    }


    const writeData = () => {
        // writes data into the document in the specified collection
        firestore()
        .collection('Users')
        .doc('PHV6F00Nt1HKkI7dcemR')
        .update({
            name: 'test123',
            mobile: '1234567890',
            email:'test@gmail.com'
        })
        .then(() => {
            console.log('User added!');
        });
    }

    const getData = async () => {
        const collRef = firestore().collection('Users');
    
        try {
            const snapshot = await collRef.where('email', '==', 'test@gmail.com').get();
    
            if (snapshot.empty) {
                console.log('No such document exists');
                return;
            }
    
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        } catch (error) {
            console.error('Error getting documents', error);
        }
    }
   
    return (
        <View>
            <Text>Home</Text>
            <Text>
                {/* {auth().currentUser ? auth().currentUser.displayName : null} */}
            </Text>
            <Text>
                {/* {auth().currentUser.uid} */}
            </Text>
            <TouchableOpacity onPress={() => {{Auth.signOut()}; navigation.navigate('Login')}}>
                <View>
                    <Text>Log Out</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addData()}>
                <View>
                    <Text>Add data</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => writeData()}>
                <View>
                    <Text>Write data</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setData()}>
                <View>
                    <Text>Set data</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getData()}>
                <View>
                    <Text>Get data</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Home;