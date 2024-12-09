import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD43pMwJcyDWe5U9UgzDbKYxoPNLx-3vQs",
    authDomain: "restaurant-374c1.firebaseapp.com",
    projectId: "restaurant-374c1",
    storageBucket: "restaurant-374c1.firebasestorage.app",
    messagingSenderId: "748791028731",
    appId: "1:748791028731:web:e40cc1d6d38387af45c95e",
    measurementId: "G-30EVZL5QZJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  facebookProvider,
  googleProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
};