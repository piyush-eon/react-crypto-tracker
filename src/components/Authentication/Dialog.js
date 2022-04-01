import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { CryptoState } from '../../Context';
import { Button } from '@material-ui/core';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { makeStyles } from '@material-ui/core';
import { orange, red, green, purple } from '@material-ui/core/colors';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export default function Udialog() {

    const useStyles = makeStyles({
        dialogPaper: {
          margin: 'center',
          display: "flex",
          flexDirection: "column",
        },
        text: {
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          fontSize: 30,
          fontWeight: "normal",
        },
      });
    const classes = useStyles();

    const [open,setOpen] = useState(false);
    const [Info,setInfo] = useState([]);
    const [Risk,setRisk] = useState([]);
    const [Icon,setIcon] = useState([]);
    const { user } = CryptoState();

    const Calculate = () => {
        setOpen(!open);
        // eslint-disable-next-line
        if ( Info.Risk == 0 ) {
            setRisk(c1);
            setIcon(<CheckCircleIcon sx={{ color: green[500], fontSize: 35 }} />)
        // eslint-disable-next-line
        } else if ( Info.Risk == 1 ) {
            setRisk(c2);
            setIcon(<WarningIcon sx={{ color: orange[500], fontSize: 35 }} />)
        // eslint-disable-next-line
        } else if ( Info.Risk == 2 ) {
            setRisk(c3);
            setIcon(<ReportIcon sx={{ color: red[500], fontSize: 35 }} />)
        // eslint-disable-next-line
        } else if ( Info.Risk == 3 ) {
            setRisk(c4);
            setIcon(<NewReleasesIcon sx={{ color: purple[500], fontSize: 35 }} />)
        } else {
            setRisk(err);
        }
    };

    const c1 = 'ความเสี่ยงต่ำ (Low)' 
    const c2 = 'ความเสียงปานกลาง (Moderate)'
    const c3 = 'ความเสี่ยงสูง (High)'
    const c4 = 'ความเสี่ยงสูงมาก (Very High)'
    const err = 'please log in first'

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
              open={open}
              onClose={handleClose}
              maxWidth='lg'
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle>
              <Typography 
                style={{
                  fontWeight: "normal",
                  fontFamily: "Montserrat",
                  fontSize: 30,
                }}
              >
                {"Result"} {Icon}
              </Typography>
            </DialogTitle>
              <DialogContent className={classes.text} style={{ height:'100px',width:'300px' }}>
              {Risk}
              </DialogContent>
            </Dialog>
    </div>
  )
}
