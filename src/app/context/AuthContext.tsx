'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

type AuthContextReturnType = {
  user: User | null;
  googleSignIn: () => Promise<UserCredential>;
  logOut: () => void;
};
const AuthContext = createContext<AuthContextReturnType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const googleSignIn = async () => {
    console.log(';lk');
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  };

  const logOut = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextReturnType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserAuth must be used within AuthContextProvider');
  }
  return context;
};
