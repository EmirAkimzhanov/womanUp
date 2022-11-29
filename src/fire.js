// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdYGHauumGXyVda71ABJnVIN8LmCO4uSI",
  authDomain: "woman-up-b04ca.firebaseapp.com",
  projectId: "woman-up-b04ca",
  storageBucket: "woman-up-b04ca.appspot.com",
  messagingSenderId: "964056707908",
  appId: "1:964056707908:web:7dea0d297458fa04b95d11",
  measurementId: "G-W2HEWSPFWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
