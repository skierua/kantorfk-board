// import React from "react";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import { PATH_TO_SERVER } from "../driver";

/**
 *
 * @returns
 */
export const BrdOffer = (props) => {
  const { data, ...other } = props;

  const dataset = (ba = "bid") => {
    return data
      .filter((v) => v.bidask == ba)
      .sort((a, b) => {
        return a.sortorder - b.sortorder;
      });
  };

  return (
    <Stack direction="row" width="100%" {...other}>
      <Box width="48%">
        {dataset("bid").length != 0 && (
          <Stack gap={1}>
            <Header text="Куплю" />
            <Stack gap={1}>
              {dataset("bid").map((v) => {
                return (
                  <Offer id={"pbid_" + v.oid} key={"pbkey_" + v.oid} v={v} />
                );
              })}
            </Stack>
          </Stack>
        )}
      </Box>
      <Box width="4%" />
      <Box width="48%">
        {dataset("ask").length != 0 && (
          <Stack gap={1}>
            <Header text="Продам" />
            <Stack gap={1}>
              {dataset("ask").map((v) => {
                return (
                  <Offer id={"paid_" + v.oid} key={"pakey_" + v.oid} v={v} />
                );
              })}
            </Stack>
          </Stack>
        )}
      </Box>
      {/* {error && (
        <Alert severity="error">
          <Typography> {`${error}`}</Typography>
        </Alert>
      )} */}
    </Stack>
  );
};

const Header = (props) => {
  const { text } = props;
  const bg = "#57ba98"; //grey[200];
  return (
    // <Box bgcolor={"info.dark"} color={"info.contrastText"} padding={"10px"}>
    <Box bgcolor={bg} color={bg.contrastText} padding={"10px"}>
      <Typography fontSize={{ xs: "1rem", md: "2.5vmin" }}>{text}</Typography>
    </Box>
  );
};

const Offer = (props) => {
  const { v } = props;
  return (
    <Paper elevation={3} sx={{ padding: 1 }}>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
      >
        <Box
          component="img"
          sx={{
            height: { xs: "1rem", md: "3vmin" },
            // width: 350,
            maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
            border: "solid lightgrey 1px",
            borderRadius: 1,
          }}
          alt="The flag."
          src={`/flag/${v.curid}.svg`}
        />
        <Box width="65%">
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Typography>{v.name}</Typography>
            <Typography>
              {Math.abs(Number(v.amnt)).toLocaleString("uk-UA")}
            </Typography>
            {/*<Typography>{`від ${
              Math.abs(v.amnt) < 1500 ? "500" : "1 000"
            } до ${Math.abs(v.amnt).toLocaleString("uk-UA")}`}</Typography> */}
          </Stack>
          {v.onote !== undefined && v.onote !== "" && (
            <Box
              bgcolor={"whitesmoke"}
              color={"whitesmoke.contrastText"}
              p={"2px"}
            >
              <Typography>{v.onote}</Typography>
            </Box>
          )}
        </Box>
        <div width="20%" align-items="center">
          <Typography variant="button" fontSize={{ xs: "1rem", md: "3vmin" }}>
            {Number(v.price).toPrecision(4)}
          </Typography>
        </div>
      </Stack>
    </Paper>
  );
};
