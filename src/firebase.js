import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebaseConfig from "./config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
