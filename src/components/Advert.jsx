import React from "react";
import { AppBar, Box, Grid, Stack, Typography } from "@mui/material";
// import { grey, blue } from "@mui/material/colors";
// import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";

export const Advert = (props) => {
  const { ...other } = props;
  return (
    <Box {...other}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{ padding: "20vmin 0px", justifyContent: "space-around" }}
      >
        <EuroIcon className="rottext" sx={{ fontSize: "20vmin" }} />
        <CurrencyExchangeIcon
          className="rottext"
          sx={{
            fontSize: "30vmin",
          }}
        />
        <CurrencyPoundIcon className="rottext" sx={{ fontSize: "20vmin" }} />
      </Stack>
    </Box>
  );
};
