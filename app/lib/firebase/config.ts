// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCFpbirrGxKTkWNAxWv2x7y4Zu6z5cFdU",
  authDomain: "scb-contacts.firebaseapp.com",
  projectId: "scb-contacts",
  storageBucket: "scb-contacts.firebasestorage.app",
  messagingSenderId: "594518338771",
  appId: "1:594518338771:web:dc5640d2986851766cf826",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create reference to DB
export const db = getFirestore(app);
