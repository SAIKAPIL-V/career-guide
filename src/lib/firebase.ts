// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'studio-2525731056-d1386',
  appId: '1:84236984952:web:114dd3feb377fca338038d',
  storageBucket: 'studio-2525731056-d1386.appspot.com',
  apiKey: 'AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao',
  authDomain: 'studio-2525731056-d1386.firebaseapp.com',
  messagingSenderId: '84236984952',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
