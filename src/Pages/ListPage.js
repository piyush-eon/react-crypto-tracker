import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Banner from "../components/Banner/Banner";
import CovidInfo from '../components/CovidInfo';
import { DailyList } from '../config/api';
import { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import DDC from "../logo_web.png"

const ListPage = () => {

  const { id } = useParams()
  const [daily, setDaily] = useState()

  const fetchDaily = async () => {
    const { data } = await axios.get(DailyList(id));
    
    setDaily(data);
  };

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
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      textAlign: "center",
    },
    desc: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  return (
    <>
    <Banner />
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
        src={DDC} alt='logo' height='200' style={{ marginBottom : 20 }}
        />
        <Typography variant="h3" className={classes.heading}>Daily covid information</Typography>
        <Typography varient="subtitle1" className={classes.desc}>Information taken from Department of Disease Control</Typography> 
      </div>
      <CovidInfo daily={daily} />
    </div>


    </>
)}

export default ListPage