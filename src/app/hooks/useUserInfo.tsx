import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/config';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfileType } from '../types';

const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserProfile({ ...userDoc.data() } as UserProfileType);
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, userProfile };
};

export default useUserInfo;
