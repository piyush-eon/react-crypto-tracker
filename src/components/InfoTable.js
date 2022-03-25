import { makeStyles, Typography } from '@material-ui/core'
import { CryptoState } from '../CryptoContext';
import { useState, useEffect } from 'react'
import React from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import ProgressBar from 'react-bootstrap/ProgressBar'

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

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography
            variant="h4"
            style={{
              fontWeight: "normal",
              marginBottom: 30,
              fontFamily: "Montserrat",
            }}
        >
          Info: {Info.name}
        </Typography>

      <div className={classes.element}>
        <Typography 
        variant="h6"
        style={{
          fontWeight: "normal",
          marginBottom: 10,
          fontFamily: "Montserrat",
        }}>
          Oxgen: <ProgressBar animated now={progressO2} 
              style={{height:30, width:500, backgroundColor:'#222224'}} 
              variant="warning" 
              label={`${progressO2}`} 
              max={100}/> 
            {Info && Info.SpO2}
        </Typography>
      </div>
      
        <div className={classes.element}>
          <Typography 
            variant="h6"
            style={{
              fontWeight: "normal",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}>
              Temp: <ProgressBar animated now={progressTemp} 
                style={{height:30, width:500, backgroundColor:'#222224'}}
                variant="warning"
                label={`${progressTemp}`}
                max={42} /> 
              {Info && Info.Temp}
          </Typography>
        </div>

          <div className={classes.element}>
          <Typography 
            variant="h6"
            style={{
              fontWeight: "normal",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}>
              Lung volume: <ProgressBar animated now={progressLung} 
              style={{height:30, width:500, backgroundColor:'#222224'}} 
              variant="warning" 
              label={`${progressLung}`}  
              max={6000} /> 
            {Info && Info.TLC}
            </Typography>
          </div>
            
    </div>
  )
}

export default InfoTable;