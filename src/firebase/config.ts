import { LoginFormType, UpdateUserProfileType } from '@/app/types';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as refStorage,
} from 'firebase/storage';

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
const storage: FirebaseStorage = getStorage(app);

const registerUser = async (registerUser: LoginFormType) => {
  try {
    const {
      email,
      age,
      password,
      phoneNumber,
      username: username,
    } = registerUser;
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: User = userCredential.user;
    await updateProfile(user, {
      displayName: username,
    });

    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        email: user.email,
        username: username,
        age: age,
        phoneNumber: phoneNumber,
      },
      { merge: true }
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

export const sendResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log('Send reset password email error ', error);
  }
};

export const updateUserData = async (
  user: User,
  profileUpdates: UpdateUserProfileType,
  file: File | null
) => {
  try {
    const imageUrl = file && (await uploadImageToFirebase(file, user.uid));
    if (profileUpdates.username) {
      await updateProfile(user, {
        displayName: profileUpdates.username,
        photoURL: imageUrl,
      });
    }

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      username: profileUpdates.username || user.displayName,
      age: profileUpdates.age,
      phoneNumber: profileUpdates.phoneNumber,
      photoURL: imageUrl,
    });
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

export const uploadImageToFirebase = async (file: File, userId: string) => {
  try {
    // Create a reference to the file location
    const storageRef = refStorage(
      storage,
      `profile_images/${userId}/profile.jpg`
    );
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
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
