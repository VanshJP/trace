// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyATh1jGmMcOGlQdygmEx31ZDtqRnbzKRjY",
    authDomain: "trace-49547.firebaseapp.com",
    projectId: "trace-49547",
    storageBucket: "trace-49547.firebasestorage.app",
    messagingSenderId: "446380383169",
    appId: "1:446380383169:web:6b3d4ffa62ccef01652d40",
    measurementId: "G-MFWYPYD059"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;
