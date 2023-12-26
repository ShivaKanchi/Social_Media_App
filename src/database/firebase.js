// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

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
const auth = getAuth();

async function getPosts(db) {
  const postsCol = collection(db, "posts");
  const postSnapsot = await getDocs(postsCol);
  const postList = postSnapsot.docs.map((doc) => doc.data());
  return postList;
}

async function getPostsWithId(db) {
  const postCol = collection(db, "posts");
  const postSnapsot = await getDocs(postCol);
  const post = postSnapsot.docs.map((doc) => ({
    id: doc.id,
    post: doc.data(),
  }));
  return post;
}

async function login(email, password) {
  let status = await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log(error.message);
    alert(error.message);
  });
  console.log(status);

  return status;
}

export { db, getPosts, getPostsWithId, login };
