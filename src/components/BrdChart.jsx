import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const BrdChart = (props) => {
  const { usdAvrg, eurAvrg, plnAvrg, ...other } = props;

  return (
    <Box {...other}>
      <Box
        display={"flex"}
        justifyContent="center"
        backgroundColor="whitesmoke"
      >
        <Typography
          // color={colorset[2]}
          fontSize={{ xs: "1rem", md: "2.5vmin" }}
          // fontWeight={fw}
        >
          Динаміка курсу за місяць
        </Typography>
      </Box>
      <Stack direction={"row"} gap={0} justifyContent={"space-between"}>
        <LChart
          height={250}
          width={"33%"}
          data={usdAvrg}
          title={"USD"}
          sx={{ backgroundColor: "white" }}
        />
        <LChart
          height={250}
          width={"33%"}
          data={eurAvrg}
          title={"EUR"}
          color={"RoyalBlue"}
          sx={{ backgroundColor: "white" }}
        />
        <LChart
          height={250}
          width={"33%"}
          data={plnAvrg}
          title={"PLN"}
          color={"BlueViolet"}
          sx={{ backgroundColor: "white" }}
        />
      </Stack>
    </Box>
  );
};

const LChart = (props) => {
  const { data, title, color, ...other } = props;

  return (
    <Box {...other}>
      <Box display={"flex"} justifyContent="center">
        {title}
      </Box>
      <LineChart
        //   width="100%"
        // height={250}
        series={[
          // {
          //   dataKey: "bid",
          //   label: "куп",
          //   showMark: false, //({ index }) => index % 4 === 0,
          // },
          {
            dataKey: "avrg",
            // label: "avrg",
            showMark: false, //({ index }) => index % 4 === 0,
            color: color || "green",
            // area: true,
          },
          // {
          //   dataKey: "ask",
          //   label: "прод",
          //   showMark: false, //({ index }) => index % 4 === 0,
          // },
        ]}
        // xAxis={[{ scaleType: "band", dataKey: "month" }]}
        xAxis={[
          {
            dataKey: "x",
            scaleType: "point",
            valueFormatter: (value) => value.slice(-2),
            // max: 31,
          },
        ]}
        dataset={data}
      />
    </Box>
  );
};
