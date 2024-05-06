import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  //classroom.adventure.japan
  // apiKey: "AIzaSyDtWr1hlPyYuImU_UZKp82yNhUGLB-ti24",
  // authDomain: "ai-training-b71e1.firebaseapp.com",
  // projectId: "ai-training-b71e1",
  // storageBucket: "ai-training-b71e1.appspot.com",
  // messagingSenderId: "111147197168",
  // appId: "1:111147197168:web:eea560227373defeb01835",
  // measurementId: "G-RW1LKDXQ5W"
  //h.noanoa
  apiKey: "AIzaSyDVvxb6i7jrse4F72a2CR889a6v4ods9f8",
  authDomain: "ai-training-4b352.firebaseapp.com",
  projectId: "ai-training-4b352",
  storageBucket: "ai-training-4b352.appspot.com",
  messagingSenderId: "221317342949",
  appId: "1:221317342949:web:23465dd3b9699771ee560c",
  measurementId: "G-9KNCW137L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectFirestoreEmulator(db, '127.0.0.1', 8080);
// if (location.hostname === "localhost") {
//   // Point to the Storage emulator running on localhost.
//   connectStorageEmulator(storage, "127.0.0.1", 9199);
// } 
// connectStorageEmulator(storage, "127.0.0.1", 9199);

export { app, analytics, auth, db, storage};
