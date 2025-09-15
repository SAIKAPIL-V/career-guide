import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao",
  authDomain: "studio-2525731056-d1386.firebaseapp.com",
  projectId: "studio-2525731056-d1386",
  storageBucket: "studio-2525731056-d1386.firebasestorage.app",
  messagingSenderId: "84236984952",
  appId: "1:84236984952:web:114dd3feb377fca338038d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
