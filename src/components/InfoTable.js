import { makeStyles } from '@material-ui/core'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { db } from '../firebase'
import React from 'react'


function InfoTable() {
  const [users, setUser] = useState([])

  useEffect(() => {
    const q = query(collection(db, "users"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setUser(querySnapshot.docs.map(doc => doc.data()));
    });
  }, [])

  const useStyles = makeStyles((theme) => ({
    display: {
      display: "flex",
      height: "200",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
  }));



  const classes = useStyles();

  return (
    <div className={classes.display}>
      {users.map(({email,uid}) => (
        <div>
            Email:{email} UID:{uid}
        </div>
      ))}
    </div>
  )
}

export default InfoTable;