// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloging-7c392.firebaseapp.com",
  projectId: "bloging-7c392",
  storageBucket: "bloging-7c392.appspot.com",
  messagingSenderId: "677290791049",
  appId: "1:677290791049:web:7ef8905bae4b37fa303658",
  measurementId: "G-CCV6NML2YP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
