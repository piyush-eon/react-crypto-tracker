import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Tab, Tabs, AppBar, TextField, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <Box
                p={3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  type="email"
                  label="Enter Email"
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Enter Password"
                  type="password"
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#EEBC1D" }}
                >
                  Login
                </Button>
              </Box>
            )}
            {value === 1 && (
              <Box
                p={3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  type="email"
                  label="Enter Email"
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Enter Password"
                  type="password"
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#EEBC1D" }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
