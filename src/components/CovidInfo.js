import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DailyList } from '../config/api';
import { makeStyles, Typography } from '@material-ui/core';

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
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

const classes = useStyles();



  return (
    <div>
      <Typography className={classes.container} >
        ผู้ติดเชื้อรายใหม่ {daily&&daily[0].new_case} ราย
      </Typography>
    </div>
    
  )
}

export default CovidInfo