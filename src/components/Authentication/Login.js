import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from '../../Context';
import PasswordForgot from './PasswordForgot';

const Login = ( {handleClose} ) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const { setAlert } = CryptoState();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleSubmit = async () => {
      if (!email || !password) {
        setAlert({
          open: true,
          message: "Please fill all the Fields",
          type: "error",
        });
        return;
      }

      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setAlert({
          open: true,
          message: `Log in Successful. Welcome ${result.user.email}`,
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Log In
      </Button>
      <Button onClick={handleOpen} color="primary">
        password forgotten?
      </Button>
      <PasswordForgot open={open}/>
    </Box>
  )
}

export default Login