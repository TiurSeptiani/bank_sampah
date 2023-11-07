import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAoXxDMaHEgLTZM5jvIWVdVEAA4wM-C9vY",
  authDomain: "bank-sampah-f83ae.firebaseapp.com",
  databaseURL: "https://bank-sampah-f83ae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bank-sampah-f83ae",
  storageBucket: "bank-sampah-f83ae.appspot.com",
  messagingSenderId: "677372340286",
  appId: "1:677372340286:web:291b9a6e56efa801b0896f",
  measurementId: "G-MKLGBTYVLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)