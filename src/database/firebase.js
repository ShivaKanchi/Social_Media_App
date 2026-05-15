import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, updateProfile } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "social-media-app-2360a.firebaseapp.com",
  projectId: "social-media-app-2360a",
  storageBucket: "social-media-app-2360a.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

async function signUpUser(email, password, username) {
  try {
    const authUser = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(authUser.user, { displayName: username });
    return authUser;
  } catch (error) {
    alert("Sign up failed. Please try again.");
  }
}

async function logInUser(email, password) {
  try {
    const authUser = await signInWithEmailAndPassword(auth, email, password);
    return authUser;
  } catch (error) {
    alert("Login failed. Please check your credentials and try again.");
  }
}

async function logOutUser() {
  await signOut(auth);
}

export { db, auth, storage, signUpUser, logInUser, logOutUser };