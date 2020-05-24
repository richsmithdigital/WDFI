
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXKUyG0Q7ej_qogW7q6VtpcSzFnGlbe78",
  authDomain: "wdfi-16638.firebaseapp.com",
  databaseURL: "https://wdfi-16638.firebaseio.com",
  projectId: "wdfi-16638",
  storageBucket: "wdfi-16638.appspot.com",
  messagingSenderId: "17258536849",
  appId: "1:17258536849:web:6458b0f4be298704310430",
  measurementId: "G-Q2TZF1PW2M"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };