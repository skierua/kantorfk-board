import React from "react";
import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";

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
        </Toolbar>
      </Container>
    </Box>
  );
};
