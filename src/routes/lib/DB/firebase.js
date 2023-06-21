
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAolEa2sfTg_PIHVhBJZ_j7gBHuRkTnrCs",
  authDomain: "votingsystem-5ded4.firebaseapp.com",
  projectId: "votingsystem-5ded4",
  storageBucket: "votingsystem-5ded4.appspot.com",
  messagingSenderId: "150363076091",
  appId: "1:150363076091:web:dc0b6b1c11066bf3ec875e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);