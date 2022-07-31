import { initializeApp } from "firebase/app";

import{getFirestore} from "firebase/firestore";
import{getStorage} from "firebase/storage";
import{getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA4-LCpMGIER03JME4A4YI1f4jtLnQiMwk",
  authDomain: "blogs-6878e.firebaseapp.com",
  projectId: "blogs-6878e",
  storageBucket: "blogs-6878e.appspot.com",
  messagingSenderId: "136239013753",
  appId: "1:136239013753:web:8d9d2ce8f72616134f59a8",
  measurementId: "G-BCXBMGPDMZ"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db =getFirestore(app)
const storage = getStorage(app);
export {auth, db, storage}