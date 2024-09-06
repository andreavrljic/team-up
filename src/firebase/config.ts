import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  QuerySnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const auth = getAuth(app);

const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log('Successfully registered', userCredential.user);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

const signInUser = async (email: string, password: string) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('Successfully signed in user', userCredentials);
  } catch (error) {
    console.error('Error signing in', error);
  }
};

initializeApp(firebaseConfig);
//init
export const db = getFirestore();

export const fetchFirebaseData = async (collectionName: string) => {
  //collection reference
  const collectionRef = await getDocs(collection(db, collectionName));
  let data: any = [];
  collectionRef.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const extractData = (
  collectionRef: QuerySnapshot<DocumentData, DocumentData>
) => {
  let data: any = [];
  collectionRef.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export { app, auth, registerUser, signInUser };
