import React from "react";
import { AppBar, Box, Grid, Stack, Typography } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import CallIcon from "@mui/icons-material/Call";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faYoutube,
//   faFacebook,
//   faTwitter,
//   faInstagram,
// } from "@fortawesome/free-brands-svg-icons";
// import InstagramIcon from "@mui/icons-material/Instagram";

// <Stack
//   position="fixed"
//   spacing={1}
//   color="grey"
//   width={"100%"}
//   sx={{ top: "auto", bottom: 0, backgroundColor: grey[50] }}
//   alignItems={"center"}
// >
//  </Stack>

const Ver1 = () => {
  return (
    <Stack>
      {/* <Box
        style={{
          // backgroundImage: `url(/img/christmas01.avif)`,
          backgroundImage: `url(/img/christmas-07.gif)`,
          // backgroundImage: `url(/img/christmas04.avif)`,
          // backgroundImage: `url(/img/christmas06.avif)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "200px",
          // width: "100%",
        }}
      /> */}
      <Stack
        direction="row"
        spacing={{ xs: 8, md: 15 }}
        sx={{ justifyContent: "center", backgroundColor: "transparent" }}
        // bgcolor={"transparent"}
      >
        <Qr3 vicon={"home"} valt="web home social" />
        <Qr3 vicon={"insta"} valt="instagram social" />
        <Qr3 vicon={"tg"} valt="telegram social" />
      </Stack>
    </Stack>
  );
};

const Ver2 = () => {
  return (
    <Box
      position="fixed"
      width={"100%"}
      color={grey[700]}
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: grey[50],
        padding: "10px 0px",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={4} align={"center"}>
          <HomeIcon fontSize={"small"} />
        </Grid>
        <Grid item xs={4} align={"center"}>
          <InstagramIcon fontSize={"small"} className="instagram social" />
        </Grid>
        <Grid item xs={4} align={"center"}>
          <TelegramIcon fontSize={"small"} className="telegram social" />
        </Grid>
        <Grid item xs={4} align={"center"}>
          <Qr vimg={"kantorfk_qr_home.png"} valt="web home social" />
        </Grid>
        <Grid item xs={4} align={"center"}>
          <Qr vimg={"kantorfk_qr_insta.png"} valt="instagram social" />
        </Grid>
        <Grid item xs={4} align={"center"}>
          <Qr vimg={"kantorfk_qr_tg.png"} valt="telegram social" />
        </Grid>
        <Grid item xs={12} align={"center"}>
          <Typography fontSize={"90%"}>Ми в соціальних мережах</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Qr = (props) => {
  const { vimg, valt } = props;
  return (
    <Box
      component="img"
      alt={valt}
      src={`./img/${vimg}`}
      sx={{
        height: 40,
        width: 40,
        // maxHeight: { xs: 233, md: 167 },
        // maxWidth: { xs: 350, md: 250 },
      }}
    />
  );
};

const Qr2 = (props) => {
  const { vicon, valt } = props;
  return (
    <Stack alignItems={"center"}>
      {vicon === "home" && <HomeIcon fontSize={"small"} />}
      {vicon === "insta" && (
        <InstagramIcon fontSize={"small"} className="instagram social" />
      )}
      {vicon === "tg" && (
        <TelegramIcon fontSize={"small"} className="telegram social" />
      )}
      <Box
        component="img"
        alt={valt}
        src={`./img/kantorfk_qr_${vicon}.png`}
        sx={{
          height: 60,
          width: 60,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, md: 250 },
        }}
      />
    </Stack>
  );
};
const Qr3 = (props) => {
  const { vicon, valt } = props;
  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "3px",
        border: "1px solid lightgrey",
        borderRadius: "10px",
      }}
    >
      <Stack alignItems={"center"}>
        {vicon === "home" && <HomeIcon fontSize={"small"} />}
        {vicon === "insta" && (
          <InstagramIcon fontSize={"small"} className="instagram social" />
        )}
        {vicon === "tg" && (
          <TelegramIcon fontSize={"small"} className="telegram social" />
        )}
        <Box
          component="img"
          alt={valt}
          src={`./img/kantorfk_qr_${vicon}.png`}
          sx={{
            height: 60,
            width: 60,
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
        />
      </Stack>
    </Box>
  );
};
export const BrdSocial = () => {
  return (
    <Box
      position="fixed"
      width={"100%"}
      color={grey[700]}
      sx={{
        top: "auto",
        bottom: 0,
        // backgroundColor: grey[50],
        backgroundColor: "transparent",
        padding: "10px 0px",
      }}
    >
      <Ver1 />;
      <Box bgcolor={grey[50]}>
        <Stack direction={"row"} gap={3} justifyContent={"center"}>
          <Typography textAlign={"center"}>Ми в соціальних мережах</Typography>
          <Box>
            <Stack direction={"row"} gap={0.5}>
              <CallIcon fontSize="small" />
              <Typography>09 600 13 600</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
