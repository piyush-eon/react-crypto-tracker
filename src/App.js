import { makeStyles } from "@material-ui/core";
import "./App.css";
import Banner from "./components/Banner/Banner";
import CoinsTable from "./components/CoinsTable/CoinsTable";
import Header from "./components/Header";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Banner />
      <CoinsTable />
    </div>
  );
}

export default App;
