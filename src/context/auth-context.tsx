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
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, type Firestore } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { sendWelcomeEmail } from '@/ai/flows/send-welcome-email';

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
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
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

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setCookie('userLoggedIn', 'true', 7);
      } else {
        eraseCookie('userLoggedIn');
      }
      setLoading(false);
    });

    return () => {
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
    
    // Set display name in Firebase Auth
    await updateProfile(user, {
        displayName: `${details.firstName} ${details.lastName}`
    });
    
    // Save user details to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: details.firstName,
      lastName: details.lastName,
      displayName: `${details.firstName} ${details.lastName}`,
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

  const value: AuthContextType = {
    user,
    loading,
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
