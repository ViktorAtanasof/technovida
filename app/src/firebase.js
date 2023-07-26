// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1UrJ3NrTlIZloRdx8LqDCIYILq0CF6Qk",
  authDomain: "technovida-4adf2.firebaseapp.com",
  projectId: "technovida-4adf2",
  storageBucket: "technovida-4adf2.appspot.com",
  messagingSenderId: "317077317587",
  appId: "1:317077317587:web:2ad0a7dc1043efa3477126"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();