// lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, getToken, type AppCheck } from 'firebase/app-check';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao",
  authDomain: "studio-2525731056-d1386.firebaseapp.com",
  projectId: "studio-2525731056-d1386",
  storageBucket: "studio-2525731056-d1386.appspot.com",
  messagingSenderId: "84236984952",
  appId: "1:84236984952:web:114dd3feb377fca338038d"
};

// Initialize Firebase
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

let appCheck: AppCheck | undefined;
if (typeof window !== 'undefined') {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!),
    isTokenAutoRefreshEnabled: true
  });

  enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a time.
          console.warn('Firestore persistence failed: failed-precondition. This can happen with multiple tabs open.');
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.warn('Firestore persistence failed: unimplemented. Browser does not support persistence.');
      }
  });
}

export { app, auth, db, appCheck, getToken };
