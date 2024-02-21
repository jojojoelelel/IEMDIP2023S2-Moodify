import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {Auth} from '../services'

const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    return (
        <View>
            <TextInput
                placeholder='Enter name'
                onChangeText={(e) => setName(e)}
                style={(styles.textinput)}
            />
            <TextInput
                placeholder='Enter email'
                onChangeText={(e) => setEmail(e)}
                style={(styles.textinput)}
            />
            <TextInput
                placeholder='Enter password'
                onChangeText={(e) => setPassword(e)}
                style={(styles.textinput)}
            />
            <TouchableOpacity onPress={() => Auth.signUp(name, email, password)}>
                <View style={(styles.button)}>
                    <Text>Sign Up</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    textinput:{
        backgroundColor:'grey',
        color:'black',
        fontSize:18,
    },
    button:{
        alignItems:'center',
        backgroundColor:'green',
        padding:10,
        margin:10
    }
})