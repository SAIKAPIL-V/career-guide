// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-2525731056-d1386",
  appId: "1:84236984952:web:114dd3feb377fca338038d",
  storageBucket: "studio-2525731056-d1386.firebasestorage.app",
  apiKey: "AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao",
  authDomain: "studio-2525731056-d1386.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "84236984952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
