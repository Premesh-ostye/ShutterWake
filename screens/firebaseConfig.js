import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDudMCWpSH2WPMvJm0ViipzJA4hSX-oeDM",
  authDomain: "shutterwake.firebaseapp.com",
  projectId: "shutterwake",
  storageBucket: "shutterwake.appspot.com",
  messagingSenderId: "196859735759",
  appId: "1:196859735759:web:bc6003c42ae1326c7051ba",
  measurementId: "G-QMKELXLJ72"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
