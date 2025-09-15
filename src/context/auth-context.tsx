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
import { doc, setDoc, getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/lib/firebase';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (
    email: string,
    pass: string,
    details: { firstName: string; lastName: string }
  ) => Promise<any>;
  logout: () => Promise<any>;
  db: Firestore;
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

  // Initialize Firebase services in a robust way for client-side components
  const [firebaseServices] = useState(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    return { app, auth, db };
  });

  useEffect(() => {
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
    const userCredential = await createUserWithEmailAndPassword(
      firebaseServices.auth,
      email,
      password
    );
    const user = userCredential.user;
    // Create a document in Firestore for the new user
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
    return signInWithEmailAndPassword(firebaseServices.auth, email, pass);
  };

  const logout = () => {
    return signOut(firebaseServices.auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    db: firebaseServices.db,
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
