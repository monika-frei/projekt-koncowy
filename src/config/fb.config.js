import firebase from 'firebase/app'
import 'firebase/firestore' 
import 'firebase/auth'
import 'firebase/storage'

//Initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyCaKRNm8X6WVElH8zC20kc5E1Lvr_J0SjE",
    authDomain: "travel-page-55969.firebaseapp.com",
    databaseURL: "https://travel-page-55969.firebaseio.com",
    projectId: "travel-page-55969",
    storageBucket: "travel-page-55969.appspot.com",
    messagingSenderId: "530215818774",
    appId: "1:530215818774:web:218a7d064ccf681e7dc737",
    measurementId: "G-0SS2N7YW54"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;