'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  getAuth,
  type Auth,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getFirestore,
  type Firestore,
  getDoc,
} from 'firebase/firestore';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

// This is a public configuration and is safe to expose.
// Security is enforced by Firebase Security Rules.
const firebaseConfig = {
  apiKey: 'AIzaSyANKQfL37GKDMkyhGU4COg_oQpRQibiiao',
  authDomain: 'studio-2525731056-d1386.firebaseapp.com',
  projectId: 'studio-2525731056-d1386',
  storageBucket: 'studio-2525731056-d1386.appspot.com',
  messagingSenderId: '84236984952',
  appId: '1:84236984952:web:114dd3feb377fca338038d',
};

type FirebaseStatus = 'initializing' | 'connected' | 'error';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseStatus: FirebaseStatus;
  login: (email: string, pass: string) => Promise<any>;
  signup: (
    email: string,
    pass: string,
    details: { firstName: string; lastName: string }
  ) => Promise<any>;
  logout: () => Promise<any>;
  db: Firestore | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to manage cookies
const setCookie = (name: string, value: string, days: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  if (typeof window !== 'undefined') {
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
};

const eraseCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseStatus, setFirebaseStatus] =
    useState<FirebaseStatus>('initializing');
  const [firebaseServices, setFirebaseServices] =
    useState<FirebaseServices | null>(null);

  useEffect(() => {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const db = getFirestore(app);
      setFirebaseServices({ app, auth, db });
      setFirebaseStatus('connected');
    } catch (e) {
      console.error('Firebase initialization error', e);
      setFirebaseStatus('error');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!firebaseServices) return;

    const unsubscribe = onAuthStateChanged(firebaseServices.auth, (user) => {
      setUser(user);
      if (user) {
        setCookie('userLoggedIn', 'true', 7);
      } else {
        eraseCookie('userLoggedIn');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseServices]);

  const signup = async (
    email: string,
    password: string,
    details: { firstName: string; lastName: string }
  ) => {
    if (!firebaseServices) throw new Error('Firebase not initialized');
    const userCredential = await createUserWithEmailAndPassword(
      firebaseServices.auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(firebaseServices.db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: details.firstName,
      lastName: details.lastName,
      createdAt: new Date(),
    });
    return userCredential;
  };

  const login = (email: string, pass: string) => {
    if (!firebaseServices) throw new Error('Firebase not initialized');
    return signInWithEmailAndPassword(firebaseServices.auth, email, pass);
  };

  const logout = () => {
    if (!firebaseServices) throw new Error('Firebase not initialized');
    return signOut(firebaseServices.auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    firebaseStatus,
    login,
    signup,
    logout,
    db: firebaseServices?.db || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
