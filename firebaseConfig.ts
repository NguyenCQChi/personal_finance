// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAGs1R-lGoNScOQK_0aZ1KkX5av8adQxM",
  authDomain: "personal-fian.firebaseapp.com",
  projectId: "personal-fian",
  storageBucket: "personal-fian.firebasestorage.app",
  messagingSenderId: "838685143406",
  appId: "1:838685143406:web:4d2e4779d9cbc72fb9d17f",
  measurementId: "G-9H028T7KM9"
};

let firebaseApp: FirebaseApp;

if(!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, database }
