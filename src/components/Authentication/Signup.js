import React from 'react'
import { useState } from 'react'
import { Box, Button, TextField } from "@material-ui/core";
import { CryptoState } from '../../Context';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = ({ handleClose }) => {
    const [email,setEmail] = useState("");
    const [UserName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const { setAlert } = CryptoState(); 

    const handleSubmit = async () => {
      if(password !== confirmPassword) {
        setAlert({
          open:true,
          message: 'Password do not match',
          type: 'error'
        });
        return;
      }

      try {
        const result = await createUserWithEmailAndPassword(auth,email,password,UserName);
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, email, name: UserName
      });
        setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
        }); 
        handleClose();

      } catch (error) {
        setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
      }
    };


  return (
    <Box p={3}    style={{ display: "flex", flexDirection: "column", gap: "20px"}}
    >
      <TextField
        variant="outlined"
        label="Full Name"
        type="name"
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default Signup