// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKuvG8S1lFkJqWhB98EEJ5J1tb7mtWfZI",
  authDomain: "prayer-network-studio.firebaseapp.com",
  projectId: "prayer-network-studio",
  storageBucket: "prayer-network-studio.appspot.com",
  messagingSenderId: "49329096674",
  appId: "1:49329096674:web:1e206d801591b0b1515bbb",
  measurementId: "G-4SQNJWCBDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app)

export default storage