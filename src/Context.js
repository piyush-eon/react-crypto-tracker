import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

const Covid = createContext();

const AuthContext = createContext({
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email, {
    url: `http://localhost:3000/login`,
  })
}

const CryptoContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <Covid.Provider value={{ alert, setAlert, user, setUser,forgotPassword }}>
      {children}
    </Covid.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Covid);
};
