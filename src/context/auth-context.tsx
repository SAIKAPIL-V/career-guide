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
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, type Firestore } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { sendWelcomeEmail } from '@/ai/flows/send-welcome-email';

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
  const [authLoading, setAuthLoading] = useState(true);
  const [firebaseStatus, setFirebaseStatus] =
    useState<FirebaseStatus>('initializing');

  useEffect(() => {
    if (!db) {
        setFirebaseStatus('error');
        setAuthLoading(false);
        return;
    }

    // Use onSnapshot on a non-existent doc as a robust way to check for online status.
    const unsubscribeFirestore = onSnapshot(
      doc(db, 'health-check', 'status'),
      () => {
        setFirebaseStatus('connected');
      },
      (error) => {
        if (error.code === 'unavailable') {
            console.warn("Firestore is offline, but persistence should be active.");
            setFirebaseStatus('connected'); // Still connected to local cache
        } else {
            console.error("Firestore connection error:", error);
            setFirebaseStatus('error');
        }
      }
    );
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setCookie('userLoggedIn', 'true', 7);
      } else {
        eraseCookie('userLoggedIn');
      }
      setAuthLoading(false);
    });

    return () => {
        unsubscribeFirestore();
        unsubscribeAuth();
    };
  }, []);

  const signup = async (
    email: string,
    password: string,
    details: { firstName: string; lastName: string }
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: details.firstName,
      lastName: details.lastName,
      createdAt: new Date(),
    });
    
    // Send welcome email
    await sendWelcomeEmail({ email, name: details.firstName });

    return userCredential;
  };

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loading = authLoading || firebaseStatus === 'initializing';

  const value: AuthContextType = {
    user,
    loading,
    firebaseStatus,
    login,
    signup,
    logout,
    db,
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
