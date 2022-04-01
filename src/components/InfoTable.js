import { makeStyles, Typography} from '@material-ui/core'
import { CryptoState } from '../Context';
import { useState, useEffect } from 'react'
import React from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Udialog from './Authentication/Dialog';

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
  const progressLung = Info.VC
  const progressHR = Info.HR

  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <Typography
            variant="h5"
            style={{
              fontWeight: "normal",
              marginBottom: 30,
              fontFamily: "Montserrat",
              fontSize: 25,
            }}
        >
          ชื่อ: {Info.name}
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
          อัตราการเต้นของหัวใจ: {Info && Info.HR}/120 BPM <ProgressBar
            animated now={progressHR} 
            style={{height:30, width:300, backgroundColor:'#222224'}} 
            variant="warning" 
            max={120}
            label={Info.HRstate} /> 
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
          ออกซิเจนในเลือด: {Info && Info.SpO2}/100 % <ProgressBar
            animated now={progressO2} 
            style={{height:30, width:300, backgroundColor:'#222224'}} 
            variant="warning" 
            max={100} 
            label={Info.SpO2state} /> 
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
              อุณหภูมิ: {Info && Info.Temp}/39 celcius <ProgressBar  animated now={progressTemp} 
                style={{height:30, width:300, backgroundColor:'#222224'}}
                variant="warning"
                max={42}
                label={Info.Tempstate} />
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
              ปริมาตรปอด: {Info && Info.VC}/5000 ml <ProgressBar animated now={progressLung} 
              style={{height:30, width:300, backgroundColor:'#222224'}} 
              variant="warning"   
              max={5000}
              label={Info.VCstate} /> 
            </Typography>
          </div>

      <div className={classes.element}>
        <Udialog />
      </div>
    </div>
  )
}

export default InfoTable;