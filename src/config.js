import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const configOptions = {
  apiKey: "AIzaSyDv8HAVndHUSp4c9_ciovwSc3o2Mg4zBTY",
  authDomain: "pdf-reader-challenge.firebaseapp.com",
  databaseURL: "https://pdf-reader-challenge.firebaseio.com",
  projectId: "pdf-reader-challenge",
  storageBucket: "pdf-reader-challenge.appspot.com",
  messagingSenderId: "468791730968",
  appId: "1:468791730968:web:942395145c62cf5d99b46d"};

const config = firebase.initializeApp(configOptions);

export const Firestore = config.firestore();
export const Functions = config.functions();
export const Storage = config.storage();
