import React from "react";
import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export const BrdHeader = () => {
  // const [stick, setStick] = useState(false);

  return (
    <Box width={"100%"} mt={"1rem"}>
      <Container>
        {/* <AppBar
          position="relative"
          sx={{ backgroundColor: "white", color: "black" }}
        > */}
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box
            component="img"
            sx={{
              height: { xs: "41px", md: "10vmin" },
              width: { xs: "210", md: "50vmin" },
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 160, md: 240 },
            }}
            alt="Logo."
            src="./img/logo-kfk.png"
          />

          <Box
            sx={{
              bgcolor: "white",
              padding: "3px",
              border: "1px solid lightgrey",
              borderRadius: "10px",
            }}
          >
            <Stack alignItems={"center"}>
              <HomeIcon fontSize={"small"} />
              <Box
                component="img"
                alt={"web home social"}
                src={`./img/kantorfk_qr_home.png`}
                sx={{
                  height: 60,
                  width: 60,
                }}
              />
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};
