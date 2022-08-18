import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from "../../Context";
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
});


export default function UserSideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const { user, setAlert } = CryptoState();
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  

  const logOut = () => {
    signOut(auth);
    window.location.reload(false);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
  }
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
          />
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                  <Button 
                  variant="contained"
                  color='secondary'
                  onClick={() => history.push(`/info`)}
                  >
                    See Data
                  </Button>
                  <Button 
                  variant="contained"
                  color='primary'
                  onClick={() => history.push(`/`)}
                  >
                    Homepage
                  </Button>
              </div>
                  <Button
                  variant="contained"
                  className={classes.logout}
                  onClick={logOut}
                  >
                  Log Out
                </Button>
              </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
