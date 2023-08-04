import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "bold",
              marginBottom: 5,
              fontSize: 90,
              fontFamily: "Montserrat",
            }}
          >
            MACC
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Mobile App for Covid-19 Checkup
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default Banner;
