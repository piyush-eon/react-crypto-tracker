import { Dialog, DialogContent, DialogTitle, makeStyles, Typography, Button } from '@material-ui/core'
import { CryptoState } from '../CryptoContext';
import { useState, useEffect } from 'react'
import React from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import ProgressBar from 'react-bootstrap/ProgressBar'

function InfoTable() {
  const [Info,setInfo] = useState([]);
  const [open,setOpen] = useState(false);
  const {user} = CryptoState();

  const useStyles = makeStyles((theme) => ({
    display: {
      display: "flex",
      height: "200",
      flexDirection: "column",    
      justifyContent: "center",
      textAlign: "center",
    },
    header: {
      display: "flex",
      fontSize: "200",
      flexDirection: "column",    
      justifyContent: "center",
      textAlign: "center",
    },
    element: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  }));

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
      const data = doc.data( );
      setInfo(data);
    },
      )
    }
  }, [user])

  const progressO2 = Info.SpO2
  const progressTemp = Info.Temp
  const progressLung = Info.TLC

  const calculate = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <Typography
            variant="h4"
            style={{
              fontWeight: "normal",
              marginBottom: 30,
              fontFamily: "Montserrat",
              fontSize:30,
            }}
        >
          Info: {Info.name}
        </Typography>
      </div>

      <div className={classes.element}>
        <Typography 
        variant="h6"
        style={{
          fontWeight: "normal",
          marginBottom: 15,
          fontFamily: "Montserrat",
        }}>
          Oxygen: {Info && Info.SpO2} % <ProgressBar
            animated now={progressO2} 
            style={{height:30, width:300, backgroundColor:'#222224'}} 
            variant="warning" 
            max={100}/> 
        </Typography>
      </div>

        <div className={classes.element}>
          <Typography 
            variant="h6"
            style={{
              fontWeight: "normal",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}>
              Temp: {Info && Info.Temp} celcius <ProgressBar  animated now={progressTemp} 
                style={{height:30, width:300, backgroundColor:'#222224'}}
                variant="warning"
                max={42} />
          </Typography>
        </div>

          <div className={classes.element}>
          <Typography 
            variant="h6"
            style={{
              fontWeight: "normal",
              marginBottom: 30,
              fontFamily: "Montserrat",
            }}>
              Lung volume: {Info && Info.TLC} <ProgressBar animated now={progressLung} 
              style={{height:30, width:300, backgroundColor:'#222224'}} 
              variant="warning"   
              max={6000} /> 
            </Typography>
          </div>

      <div className={classes.element}>
        <Button
        variant="outlined" 
        size="medium"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={calculate}
        >
          Calculate
        </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Result"}</DialogTitle>
            <DialogContent>
              hello guys
            </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default InfoTable;