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
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/lib/firebase';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

type FirebaseStatus = 'initializing' | 'connected' | 'error';

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
  const [firebaseStatus, setFirebaseStatus] = useState<FirebaseStatus>('initializing');

  const [firebaseServices] = useState(() => {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const db = getFirestore(app);
      setFirebaseStatus('connected');
      return { app, auth, db };
    } catch (e) {
      console.error("Firebase initialization error", e);
      setFirebaseStatus('error');
      return { app: null, auth: null, db: null };
    }
  });

  useEffect(() => {
    if (!firebaseServices.auth) {
      setLoading(false);
      return;
    }
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
  }, [firebaseServices.auth]);

  const signup = async (
    email: string,
    password: string,
    details: { firstName: string; lastName: string }
  ) => {
    if (!firebaseServices.auth || !firebaseServices.db) throw new Error("Firebase not initialized");
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
    if (!firebaseServices.auth) throw new Error("Firebase not initialized");
    return signInWithEmailAndPassword(firebaseServices.auth, email, pass);
  };

  const logout = () => {
    if (!firebaseServices.auth) throw new Error("Firebase not initialized");
    return signOut(firebaseServices.auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    firebaseStatus,
    login,
    signup,
    logout,
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
