const firebase = require("firebase");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//                                                                                              import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8N0OzUX_YHGQV7FU4_XCvL9Ukapu1-QM",
  authDomain: "newmovieapi.firebaseapp.com",
  projectId: "newmovieapi",
  storageBucket: "newmovieapi.appspot.com",
  messagingSenderId: "692641041288",
  appId: "1:692641041288:web:77a8861562723b66dcc83d",
  measurementId: "G-BGDXQZNYD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//                                                                                              const analytics = getAnalytics(app);

const db = firebase.firestore();

const user = db.collection("Users");
const movie = db.collection("Movies");
const tv = db.collection("TVShows");

module.exports = {
  user,
  movie,
  tv
};


