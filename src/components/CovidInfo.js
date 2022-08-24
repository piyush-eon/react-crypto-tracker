import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DailyList } from '../config/api';
import { makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/material';

const CovidInfo = () => {

  const [daily, setDaily] = useState()

  const fetchDaily = async () => {
    const { data } = await axios.get(DailyList());
    setDaily(data);
  };
 
  useEffect(() => {
    fetchDaily();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   console.log(daily&&daily[0]);

   const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      fontSize: 25,
      fontFamily: 'Montserrat',
      color: 'black',
      padding: 30,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    box: {
      boxShadow: 3,
      marginBottom: 20,
    },
    boxAlt: {
      display: 'flex',
      flexDirection: 'row',
    },
  }));

const classes = useStyles();



  return (
    <div>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
        จำนวนผู้ติดเชื้อรายใหม่ {daily&&daily[0].new_case} ราย
        </Typography>
      </Box>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
          จำนวนผู้ติดเชื้อทั้งหมด {daily&&daily[0].total_case} ราย
        </Typography>
      </Box>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
          จำนวนผู้เสียชีวิตรายใหม่ {daily&&daily[0].new_death} ราย
        </Typography>
      </Box>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
          จำนวนผู้เสียชีวิตทั้งหมด {daily&&daily[0].total_death} ราย
        </Typography>
      </Box>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
        จำนวนผู้ป่วยรักษาหายรายใหม่ {daily&&daily[0].new_recovered} ราย
        </Typography>
      </Box>
      <Box bgcolor="#ffd700" borderRadius={12} className={classes.box}>
        <Typography className={classes.container}>
        จำนวนผู้ป่วยรักษาหายทั้งหมด {daily&&daily[0].total_recovered} ราย
        </Typography>
      </Box>
    </div>
    
  )
}

export default CovidInfo