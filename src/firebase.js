import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYbraFNvYecF95YNQ8eN1hbRF9qs8fG4c",
  authDomain: "student-attendance-syste-1362a.firebaseapp.com",
  projectId: "student-attendance-syste-1362a",
  storageBucket: "student-attendance-syste-1362a.appspot.com",
  messagingSenderId: "1025300833210",
  appId: "1:1025300833210:web:f8f7be4fd76814e2f87383",
  measurementId: "G-X10TEYBP5X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);