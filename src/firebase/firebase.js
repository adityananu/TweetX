import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5b6LrGoP6NT2a03eJ6Ynl9TTZYPAOTuk",
  authDomain: "twitterx-9bec4.firebaseapp.com",
  projectId: "twitterx-9bec4",
  storageBucket: "twitterx-9bec4.appspot.com",
  messagingSenderId: "709386443200",
  appId: "1:709386443200:web:be5f17fe62471558905025",
  measurementId: "G-JQRVGBPQ7L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
