// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"

// const app =  firebaseConfig = {
//   apiKey: "AIzaSyAoXxDMaHEgLTZM5jvIWVdVEAA4wM-C9vY",
//   authDomain: "bank-sampah-f83ae.firebaseapp.com",
//   databaseURL: "https://bank-sampah-f83ae-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "bank-sampah-f83ae",
//   storageBucket: "bank-sampah-f83ae.appspot.com",
//   messagingSenderId: "677372340286",
//   appId: "1:677372340286:web:291b9a6e56efa801b0896f",
//   measurementId: "G-MKLGBTYVLN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)

import firebase from "firebase/app";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.EACT_APP_FIREBASRE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGUNG_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export const auth = app.auth()
export default app