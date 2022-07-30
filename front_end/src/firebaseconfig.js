// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiIkpou_nCDv4JPw4pcwdTMg38YU6ANXo",
  authDomain: "flipkart-grid-13711.firebaseapp.com",
  projectId: "flipkart-grid-13711",
  storageBucket: "flipkart-grid-13711.appspot.com",
  messagingSenderId: "90019336329",
  appId: "1:90019336329:web:1ede3a284511c065907658",
  measurementId: "G-XZRXQSRQJ5"
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const database = getFirestore(Firebase_app);
// export const storage = initializeApp(Firebase_app);
// const analytics = getAnalytics(Firebase_app);




