// lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao",
  authDomain: "studio-2525731056-d1386.firebaseapp.com",
  projectId: "studio-2525731056-d1386",
  storageBucket: "studio-2525731056-d1386.appspot.com",
  messagingSenderId: "84236984952",
  appId: "1:84236984952:web:114dd3feb377fca338038d"
};


// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Firebase initialization error", e);
    // In a real app, you might want to handle this error more gracefully
    // For now, we will throw it to make it visible during development
    throw e;
  }
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
