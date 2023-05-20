import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
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
        <BrowserRouter>
        <Routes>
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
