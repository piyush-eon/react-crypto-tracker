import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { CryptoState } from '../../CryptoContext';
import { Button } from '@material-ui/core';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { makeStyles } from '@material-ui/core';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Udialog() {

    const useStyles = makeStyles({
        v1: {
          margin: 'center',
          display: "flex",
          flexDirection: "column",
        },
      });
    const classes = useStyles();

    const [open,setOpen] = useState(false);
    const [Info,setInfo] = useState([]);
    const [Risk,setRisk] = useState([]);
    const { user } = CryptoState();

    const Calculate = () => {
        setOpen(!open);
        // eslint-disable-next-line
        if ( Info.Risk == 1 ) {
            setRisk(c1);  
        // eslint-disable-next-line
        } else if ( Info.Risk == 2) {
            setRisk(c2);
        // eslint-disable-next-line
        } else if ( Info.Risk == 3) {
            setRisk(c3);
        } else {
            setRisk(c4);
        }
    };

    const c1 = 'Your risk of getting covid is very low' 
    const c2 = 'Your risk of getting covid is moderate'
    const c3 = 'Your risk of getting covid is high'
    const c4 = 'Your risk of getting covid is very high'

    useEffect(() => {
        if (user) {
          onSnapshot(doc(db, "users", user.uid), (doc) => {
          const data = doc.data( );
          setInfo(data);
        },
          )
        }
      }, [user])
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div>
        <Button
            variant="outlined" 
            size="medium"
            style={{ backgroundColor: "#EEBC1D" }}
            onClick={Calculate}
        >
        Calculate
        </Button>
            <Dialog
                className={classes.v1}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Result"}<WarningAmberIcon /></DialogTitle>
                <DialogContent>
                {Risk}
                </DialogContent>
            </Dialog>
    </div>
  )
}
