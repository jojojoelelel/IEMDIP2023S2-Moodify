// import { Auth } from '../services'
// import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
// import { getFirestore, doc, setDoc } from "firebase/firestore";


export async function setData(albumcover,artist,url,title,collection) {
  let toDate = firestore.FieldValue.serverTimestamp().toDate()
  let formattedDate = toDate.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
  firestore()
  .collection(collection)
  .doc(formattedDate)
  .set({
      AlbumCover: albumcover,
      Artist: artist,
      Title: title,
      URL: url
  })
  .then(() => {
      console.log('User added!');
  });
  
}