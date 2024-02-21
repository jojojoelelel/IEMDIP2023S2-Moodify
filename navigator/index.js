import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import MainNav from './navigator';
import AuthNavigator from './authNavigator';

import auth from '@react-native-firebase/auth';

const AppContainer = () => {
    const [initialising, setInitialising] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChange(user) {
        setUser(user);
        if(initialising) setInitialising(false)
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChange)
        return subscriber;
    }, [])

    if(initialising) return null

    return(
        <NavigationContainer>
            {user ? <MainNav /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppContainer;