import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const userAuth = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});

  function logOut() {
    return signOut(auth);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuth.Provider value={{ user, login, signUp, logOut }}>
      {children}
    </userAuth.Provider>
  );
};

const useUserAuth = () => {
  return useContext(userAuth);
};

export { AuthContext, useUserAuth };
