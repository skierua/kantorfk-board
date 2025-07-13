import React from "react";
import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TelegramIcon from "@mui/icons-material/Telegram";
import { PATH_TO_SERVER } from "../driver";

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
            src={`${PATH_TO_SERVER}/img/logo-kfk.png`}
          />
          <Stack direction={"row"} gap={2} justifyContent={"center"}>
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
                  src={`${PATH_TO_SERVER}/img/kantorfk_qr_home.png`}
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                />
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "white",
                padding: "3px",
                border: "1px solid lightgrey",
                borderRadius: "10px",
              }}
            >
              <Stack alignItems={"center"}>
                <TelegramIcon fontSize={"small"} />
                <Box
                  component="img"
                  alt={"web tg social"}
                  src={`${PATH_TO_SERVER}/img/kantorfk_qr_tg.png`}
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </Box>
  );
};
