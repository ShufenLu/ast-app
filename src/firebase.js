import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCz3lTwRf0j2Xb690CxQvPmhds1FJCvpXY",
  authDomain: "near-earth-asteroid.firebaseapp.com",
  databaseURL: "https://near-earth-asteroid.firebaseio.com",
  projectId: "near-earth-asteroid",
  storageBucket: "near-earth-asteroid.appspot.com",
  messagingSenderId: "109223796392",
  appId: "1:109223796392:web:f8424febc9288325e46c9d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection("users");
const favoritesCollection = db.collection("favorites");


export { db, auth, usersCollection, favoritesCollection};
