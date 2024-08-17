// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zanoah-oauth.firebaseapp.com",
  projectId: "zanoah-oauth",
  storageBucket: "zanoah-oauth.appspot.com",
  messagingSenderId: "755167722653",
  appId: "1:755167722653:web:6e87967dbecadf13f46874"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);