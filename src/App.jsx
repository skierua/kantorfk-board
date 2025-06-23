// import logo from "./logo.svg";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import { Sign } from "./Sign";
import { Main } from "./components/Main";
import { BrdSocial } from "./components/BrdSocial";
// import { AUTH_PATH } from "./path";
import { PATH_TO_SERVER, PATH_TO_API, authFetch } from "./driver";
import { subscribe, unsubscribe } from "./events";

function App() {
  // const { CD_KANTOR, CD_CURRENCY } = props;
  const [verror, setVerror] = useState([]);
  const [crntuser, setCrntuser] = useState({
    crntuser: "",
    term: "",
    role: "",
    user: "",
  });
  const [token, setToken] = useState("");
  // const [bgno, setBgno] = useState(Math.floor((Math.random() * 10) % 5));
  // const [bgtheme, setBgtheme] = useState("bg_winter");

  function handleError(str) {
    setVerror([...verror, str]);
    // console.log(str);
  }

  const handleSnacbar_close = () => {
    setVerror([]);
    // console.log(v);
  };

  useEffect(() => {
    subscribe(
      "signin",
      // () => setRequery((prevRequery) => ++prevRequery)
      () => {
        // setCrntuser({ name: "", role: "" });
        setCrntuser({ crntuser: "", term: "", role: "", user: "" });
      }
    );
    return () => {
      unsubscribe("signin", () => {});
    };
  });

  useEffect(() => {
    // console.log(`#836f useEffect started`);
    subscribe(
      "userChanged",
      // () => setRequery((prevRequery) => ++prevRequery)
      (resp) => {
        // console.log(resp);
        // fetch(AUTH_PATH, {
        //   // fetch(PATH_TO_SERVER + PATH_TO_API + "/auth", {
        //   method: "post",
        //   mode: "cors",
        //   headers: {
        //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        //     // "Access-Control-Allow-Origin": "http://localhost:3000",
        //   },
        //   body: `data=${resp.detail}`,
        // })
        authFetch(resp.detail)
          .then((res) => res.json())
          .then((jresp) => {
            // console.log(jresp.token);
            setToken(jresp.token);
            const [th, tp, ts] = jresp.token.split(".");
            // console.log(window.atob(tp));
            const pl = JSON.parse(window.atob(tp));
            // console.log(pl);
            // setToken(jresp.token);
            setCrntuser(pl);
            if (pl.role === "") {
              throw new Error("Login: Autentication failed.");
            }
          })
          .catch(function (err) {
            handleError(err.message);
            // console.log(`#63tv dataFetch Request failed error=${error}`);
          });
      }
    );

    return () => {
      // clearTimeout(tmr);
      unsubscribe("userChanged", () => {});
    };
  }, []);

  return (
    <div
      // component="img"
      style={{
        //   backgroundImage: `url(/img/${bgtheme}/bg${bgno}.jpg)`,
        backgroundImage: `url(${PATH_TO_SERVER}/img/bg0.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundColor: "sandybrown", //"gold", //"#646cffaa",
        height: "100%",
        //   // width: "100%",
      }}
    >
      <CssBaseline />
      <Container>
        <Stack width={{ xs: "100%" }} gap={1} alignItems={"center"}>
          {crntuser.role === "" && <Sign />}
          {crntuser.role !== "" && (
            <Main crntuser={crntuser} TOKEN={token} ferr={handleError} />
          )}
        </Stack>
      </Container>
      <BrdSocial />
      <Box sx={{ display: "flex" }}>
        {/* <Snackbar
          open={terror !== null}
          key="snak_key_a"
          autoHideDuration={6000}
          // onClose={handleSnacbar_close}
        >
          <Alert
            // onClose={handle_Snacbar_close}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {terror}
          </Alert>
        </Snackbar> */}
        {/* {verror.length && */}
        {verror.map((v, i) => (
          <Snackbar
            open={verror.length !== 0}
            // open={true}
            key={`snak_key_${i}`}
            autoHideDuration={6000}
            onClose={handleSnacbar_close}
          >
            <Alert
              // onClose={handle_Snacbar_close}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {v}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </div>
  );
}
export default App;
