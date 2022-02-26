import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";

const firebaseapp = initializeApp(firebaseConfig);

const auth = getauth(firebaseapp);
const db = getFirestore(firebaseapp);

export {auth,db}; 