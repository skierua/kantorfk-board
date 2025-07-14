// import React, { useEffect, useState, useRef } from "react";
import { Alert, Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
// import { Icon_Flag_BG, Icon_Flag_US } from "material-ui-country-flags";
// import { PATH_TO_SERVER } from "../driver";

const bulkKnt = "BULK";

const colorset = ["#f2f2f2", "#57ba98", grey[800]];
/**
 *
 * @param {*} shop str
 * @param {*} delay int refresh interval in sec
 * @returns
 */
export const BrdRate = (props) => {
  const { data, shop, ...other } = props;
  // console.log(
  //   data
  //   // data.filter((v) => v.shop == bulkKnt && v.domestic == "2" && v.prc === "")
  // );
  // const [mdata, setMdata] = useState([]);
  // const [odata, setOdata] = useState([]);
  // const [requery, setRequery] = useState(0);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  return (
    <Box {...other}>
      <Stack gap={2} width="100%">
        <Stack gap={2} direction={"row"}>
          <Stack gap={2}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TblTitle
                    title={"РОЗДРІБ"}
                    bgcolor={colorset[0]}
                    fw={"400"}
                  />
                  <TblSubTitle />
                </TableHead>
                <TableBody>
                  {data
                    .filter(
                      (v) => v.shop == shop && v.domestic == "2" && v.prc === ""
                    )
                    .map((v) => {
                      return (
                        (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                          <Row
                            id={v.atclcode + "-" + v.scode}
                            key={v.atclcode + "-" + v.scode}
                            itm={v}
                            showSub={false}
                            fw={"400"}
                          />
                        )
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TblTitle
                    title={"ІНШІ ВАЛЮТИ, купівля"}
                    bgcolor={colorset[0]}
                    fw={"400"}
                  />
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Stack
                        gap={2}
                        direction={"row"}
                        maxWidth={"40vmin"}
                        useFlexGap
                        sx={{ flexWrap: "wrap" }}
                      >
                        {data
                          .filter(
                            (v) =>
                              v.shop == shop &&
                              v.domestic == "4" &&
                              v.prc === ""
                          )
                          .map((v) => {
                            return (
                              (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                                <Box
                                  key={v.atclcode + "-" + v.scode}
                                  display={"flex"}
                                  // direction={"row"}
                                  // gap={0.75}
                                  alignItems={"center"}
                                >
                                  <Avatar
                                    src={`/flag/${v.atclcode}.svg`}
                                    sx={{
                                      width: { xs: "18px", sm: "3vmin" },
                                      height: { xs: "18px", sm: "3vmin" },
                                      border: "solid lightgrey 1px",
                                    }}
                                  />
                                  {/* <Typography variant="caption" gutterBottom>
                              &nbsp;{v.cqty === "1" ? "" : v.cqty}
                            </Typography> */}
                                  <Typography
                                    variant="button"
                                    fontSize={{ xs: "0.5rem", md: "2vmin" }}
                                  >
                                    &nbsp;{v.chid}&nbsp;
                                    {Number(v.bid).toPrecision(4)}
                                  </Typography>
                                </Box>
                              )
                            );
                          })}
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TblTbl
              data={data.filter(
                (v) => v.shop === shop && v.domestic === "2" && v.prc === ""
              )}
              bulk={false}
            /> */}
            {/*
            <Paper elevation={6} sx={{ padding: "0.3rem" }}>
              <Stack gap={0.5}>
                <Box
                  bgcolor={colorset[0]}
                  // color={"info.contrastText"}
                  padding={"5px 10px"}
                >
                  <Typography fontSize="0.9rem">РОЗДРІБ, купівля</Typography>
                </Box>
                <CurOther
                  dataset={data.filter(
                    (v) => v.shop === shop && v.domestic === "4" && v.prc === ""
                  )}
                />
              </Stack>
            </Paper>
            */}
          </Stack>
          <Stack gap={2}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TblTitle title={"ГУРТ"} bgcolor={colorset[1]} fw={"700"} />
                  <TblSubTitle />
                </TableHead>
                <TableBody>
                  {data
                    .filter(
                      (v) =>
                        v.shop == bulkKnt && v.domestic == "2" && v.prc === ""
                    )
                    .map((v) => {
                      return (
                        (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                          <Row
                            id={v.atclcode + "-" + v.scode}
                            key={v.atclcode + "-" + v.scode}
                            itm={v}
                            showSub={true}
                            fw={"700"}
                          />
                        )
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TblTitle
                    title={"КОНВЕРТАЦІЯ"}
                    bgcolor={colorset[1]}
                    fw={"700"}
                  />
                  <TblSubTitle />
                </TableHead>
                <TableBody>
                  {data
                    .filter(
                      (v) =>
                        v.shop == bulkKnt && v.domestic == "6" && v.prc === ""
                    )
                    .map((v) => {
                      return (
                        (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                          <Row
                            id={v.atclcode + "-" + v.scode}
                            key={v.atclcode + "-" + v.scode}
                            itm={v}
                            showSub={true}
                            fw={"700"}
                          />
                        )
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            {data.filter(
              (v) =>
                v.shop == bulkKnt &&
                v.domestic === "8" &&
                v.prc === "" &&
                v.bid !== "" &&
                v.ask !== ""
            ).length !== 0 && (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TblTitle
                      title={"КРИПТА"}
                      bgcolor={colorset[1]}
                      fw={"700"}
                    />
                    <TblSubTitle />
                  </TableHead>
                  <TableBody>
                    {data
                      .filter(
                        (v) =>
                          v.shop == bulkKnt &&
                          v.domestic === "8" &&
                          v.prc === "" &&
                          v.bid !== "" &&
                          v.ask !== ""
                      )
                      .map((v) => {
                        return (
                          (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                            <Row
                              id={v.atclcode + "-" + v.scode}
                              key={v.atclcode + "-" + v.scode}
                              itm={v}
                              showSub={true}
                              fw={"700"}
                            />
                          )
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* <TblTbl
            data={data.filter(
              (v) => v.shop === bulkKnt && v.domestic === "2" && v.prc === ""
            )}
            bulk={true}
          /> */}
          </Stack>
        </Stack>
        <Box></Box>
      </Stack>
    </Box>
  );
};

const CurAmntCell = (props) => {
  const { amnt, color, fontWeight, ...other } = props;
  return (
    <TableCell align="center" {...other}>
      <Typography
        fontSize={{ xs: "1rem", md: "2.7vmin" }}
        color={color}
        fontWeight={fontWeight}
      >
        {!isNaN(amnt)
          ? Number(amnt) !== 0
            ? Number(amnt).toPrecision(4)
            : ""
          : amnt}
        {/* {Number(amnt) !== 0 ? Number(amnt).toPrecision(4) : ""} */}
      </Typography>
    </TableCell>
  );
};

const Row = (props) => {
  const { itm, showSub, fw } = props;

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="center" bgcolor="white">
        <Stack direction={"row"} gap={2} alignItems={"center"}>
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
            alt={`${itm.chid} flag.`}
            src={`/flag/${itm.atclcode}.svg`}
          />
          <Box gap={2} display={"flex"} alignItems={"center"}>
            <Typography
              variant="button"
              fontSize={{ xs: "1rem", md: "2.7vmin" }}
            >
              {itm.chid}
            </Typography>
            {showSub && (
              <Typography
                // variant="button"
                fontSize={{ xs: "0.7rem", md: "1.8vmin" }}
              >
                {itm.sname}
              </Typography>
            )}
          </Box>
        </Stack>
      </TableCell>
      <CurAmntCell
        amnt={itm.bid}
        color={colorset[2]}
        fontWeight={fw} //{bulk ? "700" : "400"}
        bgcolor={colorset[0]}
        width={"27%"}
      />
      <CurAmntCell
        amnt={itm.ask}
        color={colorset[2]}
        fontWeight={fw} //{bulk ? "700" : "400"}
        bgcolor={colorset[0]}
        width={"27%"}
      />
    </TableRow>
  );
};

const TblTitle = (props) => {
  const { title, bgcolor, fw } = props;
  return (
    <TableRow>
      <TableCell align="center" colSpan={3} bgcolor={bgcolor}>
        <Typography
          color={colorset[2]}
          fontSize={{ xs: "1rem", md: "2.5vmin" }}
          fontWeight={fw}
        >
          {title}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const TblSubTitle = (props) => {
  return (
    <TableRow>
      <TableCell align="center" bgcolor="white" padding={"none"}>
        <Typography color={grey[500]} fontSize="0.9rem">
          назва
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        padding={"none"}
        width={"18%"}
        bgcolor={colorset[0]}
      >
        <Typography color={grey[500]} fontSize="0.9rem">
          купівля
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        padding={"none"}
        width={"18%"}
        bgcolor={colorset[0]}
      >
        <Typography color={grey[500]} fontSize="0.9rem">
          продаж
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const TblTbl = (props) => {
  const { data, bulk, ...other } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TblTitle bulk={bulk} />
          <TblSubTitle />
        </TableHead>
        <TableBody>
          {data.map((v) => {
            return (
              (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                <Row
                  id={v.atclcode + "-" + v.scode}
                  key={v.atclcode + "-" + v.scode}
                  itm={v}
                  bulk={bulk}
                />
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CurOther = (props) => {
  const { dataset, ...other } = props;

  return (
    <Box {...other}>
      <Grid container spacing={{ xs: 0, sm: 1 }}>
        {dataset.map((v) => {
          return (
            <Grid
              id={v.atclcode}
              key={v.atclcode}
              item
              xs={4}
              sm={3}
              // md={2}
              align={"center"}
            >
              <Stack direction={"row"} gap={0.75} alignItems={"center"}>
                <Avatar
                  src={`./flag/${v.atclcode}.svg`}
                  sx={{
                    width: { xs: "18px", sm: "3vmin" },
                    height: { xs: "18px", sm: "3vmin" },
                    border: "solid lightgrey 1px",
                  }}
                />
                {/* <Typography variant="caption" gutterBottom>
                    &nbsp;{v.cqty === "1" ? "" : v.cqty}
                  </Typography> */}
                <Typography
                  variant="button"
                  fontSize={{ xs: "0.85rem", md: "2.7vmin" }}
                >
                  &nbsp;{v.chid}&nbsp; {Number(v.bid).toPrecision(4)}
                </Typography>
              </Stack>
              {/* </Box> */}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
