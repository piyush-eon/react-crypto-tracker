import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DailyList } from '../config/api';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

const CovidInfo = () => {

  const { id } = useParams()
  const [Daily, setDaily] = useState()

  const fetchDaily = async () => {
    const { data } = await axios.get(DailyList(id));
    
    setDaily(data);
  };

  console.log(Daily);

  useEffect(() => {
    fetchDaily();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
}));

const classes = useStyles();

  return (
      <Typography className={classes.container}>New Deaths:{Daily?.new_case}</Typography>
  )
}

export default CovidInfo