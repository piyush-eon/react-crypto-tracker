import { makeStyles, Typography } from '@material-ui/core'
import { CryptoState } from '../CryptoContext';
import { useState, useEffect } from 'react'
import React from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

function InfoTable() {
  const [Info,setInfo] = useState([]);
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
  }));

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
      const data = doc.data( );
      setInfo(data);
      console.log("data",data)
    },
      )
    }
  }, [user])

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography
            variant="h4"
            style={{
              fontWeight: "normal",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}
          >
            Info
          </Typography>
      <div>Oxgen: {Info && Info.SpO2}</div>
      <div>Temp: {Info && Info.Temp} celcius</div>
      <div>Lung volume: {Info && Info.TLC}</div>
    </div>
  )
}

export default InfoTable;