import { LinearProgress, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div style={{ display: "flex", height: "85vh" }}>
      <div
        style={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 30,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.<br />
          {/* {ReactHtmlParser(coin?.description.en.split(". ")[1])}. */}
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
