import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase";

const AUTH_CONTEXT = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password (signup)
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user with email and password (login)
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log out user
  const logout = () => {
    return signOut(auth);
  };

  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // update email
  const updateEmail = (email) => {
    return user.updateEmail(email);
  };

  // update password
  const updatePassword = (password) => {
    return user.updatePassword(password);
  };

  // check if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        (currentUser === null || currentUser) && setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loading]);

  const authInfo = {
    user,
    loading,
    setLoading,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export const useAuth = () => useContext(AUTH_CONTEXT);

export default AuthProvider;
