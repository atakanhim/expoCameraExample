// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJYqLz2uWSXDSSyVJ2wKAeXNF8Y3OOABQ",
  authDomain: "mediupload2.firebaseapp.com",
  projectId: "mediupload2",
  storageBucket: "mediupload2.appspot.com",
  messagingSenderId: "1034846931346",
  appId: "1:1034846931346:web:40f9af3f2f7062024f994b",
  measurementId: "G-MF2FRTEBL3"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);