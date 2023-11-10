// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-21cad.firebaseapp.com",
  projectId: "mern-estate-21cad",
  storageBucket: "mern-estate-21cad.appspot.com",
  messagingSenderId: "641128848444",
  appId: "1:641128848444:web:765b230231e23d14d0b739",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
