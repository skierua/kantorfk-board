import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BrdHeader } from "./BrdHeader";
import { BrdRate } from "./BrdRate";
import { BrdOffer } from "./BrdOffer";
// import { API_PATH } from "../path";
import { getData, postData } from "../driver";

const interval = 9; // reload interval sec
const bulkKnt = "BULK";

export const Main = (props) => {
  const { crntuser, ferr, TOKEN, ...other } = props;
  const [rates, setRates] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  let tmrUpd;

  const sortRates = (v) => {
    return v.sort((a, b) => {
      return Number(a.sortorder) - Number(b.sortorder);
    });
  };

  // useEffect(() => {
  //   // load();
  //   loadRate();
  //   setTimeout(loadOffer, 1000);
  //   const tmR = setInterval(loadRate, 1000 * interval); //
  //   const tmO = setInterval(loadOffer, 1000 * interval + 500); //
  //   // loadRate();
  //   // setTimeout(loadOffer, 500);
  //   // const evtSource = new EventSource("https://test.kantorfk.com/api/vb1/sse");
  //   // const evtSource = new EventSource("/api/vb1/sse");
  //   /*const evtSource = new EventSource(`${PATH_TO_SSE}`);
  //   setTimeout(() => {
  //     evtSource.addEventListener("offer_stream", (event) => {
  //       setOffers(JSON.parse(event.data).rslt);
  //     });
  //     evtSource.addEventListener("rate_stream", (event) => {
  //       setRates(JSON.parse(event.data).rslt);
  //     });
  //   }, 5000); */
  //   return () => {
  //     clearInterval(tmR);
  //     clearInterval(tmO);
  //     // evtSource.close();
  //   };
  // }, []);

  const load = async () => {
    // console.log(`#74h MAIN data loaded`);
    await postData("/rates", TOKEN, { reqid: "sse2" }, (e, v) => {
      if (e === null) {
        setRates(sortRates(v));
      } else {
        // console.error("Main " + e);
        ferr("Main " + e);
      }
    });

    await getData("/offers", "reqid=sse", (e, v) => {
      if (e === null) {
        setOffers(v);
      } else {
        // console.error("Main " + e);
        ferr("Main " + e);
      }
    });
  };

  useEffect(() => {
    // console.log(`#34hn useEffect RATES started`);
    tmrUpd = setTimeout(async function loadData() {
      // console.log(`#34hn render GETDATA`);
      await load();
      tmrUpd = setTimeout(loadData, 1000 * interval); // (*)
    }, 0);
    return () => {
      clearTimeout(tmrUpd);
    };
  }, []);

  useEffect(() => {
    const onVisibility_changed = () => {
      if (document.visibilityState === "visible") {
        tmrUpd = setTimeout(async function loadData() {
          // console.log(`#904u visibility GETDATA`);
          load();
          tmrUpd = setTimeout(loadData, 1000 * interval); // (*)
        }, 0);
        // console.log(`#e8y useEffect turns visibile `);
      } else {
        clearTimeout(tmrUpd);
        // console.log(`#9wj useEffect turns HIDDEN `);
      }
    };

    document.addEventListener("visibilitychange", onVisibility_changed);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility_changed);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }} {...other}>
      <Stack width={{ xs: "100%" }} gap={1} alignItems={"center"}>
        <BrdHeader />
        <BrdRate data={rates} shop={crntuser.term} />
        <BrdOffer data={offers.filter((v) => v.shop == crntuser.term)} />
        {/* <Advert /> */}
      </Stack>
    </Box>
  );
};
