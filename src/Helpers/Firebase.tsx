import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtWr1hlPyYuImU_UZKp82yNhUGLB-ti24",
  authDomain: "ai-training-b71e1.firebaseapp.com",
  projectId: "ai-training-b71e1",
  storageBucket: "ai-training-b71e1.appspot.com",
  messagingSenderId: "111147197168",
  appId: "1:111147197168:web:eea560227373defeb01835",
  measurementId: "G-RW1LKDXQ5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage};
