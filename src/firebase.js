// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCufiYX6oXUuh1caBrBmOqbA0rrCohLE4Q",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||  "buybusyappdev.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ||  "buybusyappdev",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||  "buybusyappdev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||  "365125218242",
  appId: process.env.REACT_APP_FIREBASE_APP_ID ||  "1:365125218242:web:5d78c14a022cbcff4d705b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
