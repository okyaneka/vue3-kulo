// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://suka-suka-543a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  apiKey: "AIzaSyBmx1sM-a2KAFHoeCD-C5KpA87dUoB8q90",
  authDomain: "suka-suka-543a5.firebaseapp.com",
  projectId: "suka-suka-543a5",
  storageBucket: "suka-suka-543a5.appspot.com",
  messagingSenderId: "603148538649",
  appId: "1:603148538649:web:f3061c57928a4e17196b88",
  measurementId: "G-SXJY6FQD2P",
};

const app = initializeApp(firebaseConfig);
const realdb = getDatabase(app);

export default realdb;
