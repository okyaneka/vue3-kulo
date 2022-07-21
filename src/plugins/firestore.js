// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmx1sM-a2KAFHoeCD-C5KpA87dUoB8q90",
  authDomain: "suka-suka-543a5.firebaseapp.com",
  databaseURL:
    "https://suka-suka-543a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suka-suka-543a5",
  storageBucket: "suka-suka-543a5.appspot.com",
  messagingSenderId: "603148538649",
  appId: "1:603148538649:web:f3061c57928a4e17196b88",
  measurementId: "G-SXJY6FQD2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
