import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native'

const signUp = (fullname, email, password) => {
    if (!fullname || !email || !password) {
        Alert.alert('Enter data')
    } else {
        return auth().createUserWithEmailAndPassword(email.trim(),password)
        .then( cred => {
            const {uid} = cred.user;
            auth().currentUser?.updateProfile({
                displayName: fullname
            })
            return uid;
        })
        .catch(
            err => Alert.alert(err.code, err.message)
        )
    }
}

const signIn = (email, password) => {
    if (email && password) {
        return auth().signInWithEmailAndPassword(email.trim(), password)
        .then(() => {
            console.log(auth().currentUser?.uid + ' logged in')
        })
        .catch(
            err => Alert.alert(err.code, err.message)
        )
    } else {
        Alert.alert('Enter details!')
    }
}

const signOut = () => {
    return auth().signOut()
}

const Auth = {
    signUp,
    signIn,
    signOut
}

export default Auth;