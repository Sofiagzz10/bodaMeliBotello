// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOwbnoAsLw_lW9OPOsumJELAN1JIDbfMk",
  authDomain: "boda-meli-y-joel.firebaseapp.com",
  projectId: "boda-meli-y-joel",
  storageBucket: "boda-meli-y-joel.firebasestorage.app",
  messagingSenderId: "89836674580",
  appId: "1:89836674580:web:991509c3f39f8725a3d101",
  measurementId: "G-DZY1TCXPNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
