import * as firebase from "firebase/app"
import "firebase/analytics"

var firebaseConfig = {
  apiKey: "AIzaSyCUMsjQNJDzj_AZLzeq6sUCV5Ph-H1d408",
  authDomain: "janu-app.firebaseapp.com",
  databaseURL: "https://janu-app.firebaseio.com",
  projectId: "janu-app",
  storageBucket: "janu-app.appspot.com",
  messagingSenderId: "697673742861",
  appId: "1:697673742861:web:5eff5365467f778182b344",
  measurementId: "G-HJXPZGLEL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
