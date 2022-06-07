import React from 'react'
import { useState } from 'react';
import { auth } from '../../firebase';
import { Box, Button, TextField } from '@material-ui/core';
import { sendPasswordResetEmail } from "firebase/auth";
import { CryptoState } from '../../Context';

const PasswordForgot = ( {handleClose} ) => {
    const [email,setEmail] = useState("");
    const { setAlert } = CryptoState();

    const forgor = async () => {
        try {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setAlert({
                open: true,
                message:"password sent",
                type: "success",
            });
        })
        }
      catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }}

  return (
    <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
    <Button onClick={forgor} variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}>
        Send password
    </Button>
    </Box>  
  )
}

export default PasswordForgot