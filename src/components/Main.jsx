import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Advert } from "./Advert";
import { BrdHeader } from "./BrdHeader";
import { BrdRate } from "./BrdRate";
import { BrdOffer } from "./BrdOffer";
import { API_PATH } from "../path";

const interval = 9; // reload interval sec
const bulkKnt = "BULK";

export const Main = (props) => {
  const { crntuser, ferr } = props;
  const [rates, setRates] = useState([]);
  const [offers, setOffers] = useState([]);

  const sortRates = (v) => {
    return v.sort((a, b) => {
      return Number(a.sortorder) - Number(b.sortorder);
    });
  };

  const loadRate = () => {
    // console.log(`#8y3 App/loadRate started`);
    fetch(`${API_PATH}/rates?reqid=sse2`, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((jresp) => {
        // console.log(jresp);
        if (jresp.status === 0) {
          setRates(sortRates(jresp.rslt));
        } else {
          throw new Error(`Rates: ${jresp.str} (${jresp.note})`);
        }
        // setError(null);
      })
      .catch((err) => {
        ferr(err.message);
      });
  };

  const loadOffer = () => {
    // console.log(`#12u App/loadOffer started`);
    fetch(`${API_PATH}/offers?reqid=sse`, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((jresp) => {
        if (jresp.status === 0) {
          setOffers(jresp.rslt);
        } else {
          throw new Error(`Offers: ${jresp.str} (${jresp.note})`);
        }
        // setError(null);
      })
      .catch((err) => {
        ferr(err.message);
        // let v = verror;
        // v.push(err.message);
        // setVerror(v);
      });
  };

  useEffect(() => {
    // load();
    loadRate();
    setTimeout(loadOffer, 1000);
    const tmR = setInterval(loadRate, 1000 * interval); //
    const tmO = setInterval(loadOffer, 1000 * interval + 500); //
    // loadRate();
    // setTimeout(loadOffer, 500);
    // const evtSource = new EventSource("https://test.kantorfk.com/api/vb1/sse");
    // const evtSource = new EventSource("/api/vb1/sse");
    /*const evtSource = new EventSource(`${PATH_TO_SSE}`);
    setTimeout(() => {
      evtSource.addEventListener("offer_stream", (event) => {
        setOffers(JSON.parse(event.data).rslt);
      });
      evtSource.addEventListener("rate_stream", (event) => {
        setRates(JSON.parse(event.data).rslt);
      });
    }, 5000); */
    return () => {
      clearInterval(tmR);
      clearInterval(tmO);
      // evtSource.close();
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Stack width={{ xs: "100%" }} gap={1} alignItems={"center"}>
        <BrdHeader />
        <BrdRate
          title="Курси валют"
          data={rates}
          // data={rates.filter((v) => v.shop == crntuser.term)}
          shop={crntuser.term}
          // delay="150"
        />
        <BrdOffer data={offers.filter((v) => v.shop == crntuser.term)} />
        <Advert />
      </Stack>
    </Box>
  );
};
