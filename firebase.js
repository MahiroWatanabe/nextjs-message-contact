import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqgo71fOJ10gq_bSU62eE6Q0B17yE7smY",
  authDomain: "message-contact.firebaseapp.com",
  projectId: "message-contact",
  storageBucket: "message-contact.appspot.com",
  messagingSenderId: "272574359410",
  appId: "1:272574359410:web:6f1a07394d589be82e5feb",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
