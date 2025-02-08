import React, { useEffect, useState, useRef } from "react";
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

const colorset = ["#f2f2f2", "#57ba98", grey[800]];
/**
 *
 * @param {*} shop str
 * @param {*} delay int refresh interval in sec
 * @returns
 */
export const BrdRate = (props) => {
  const { data, shop, delay, footer, alwaysShow, ...other } = props;
  const show = useRef(true);
  // const [mdata, setMdata] = useState([]);
  // const [odata, setOdata] = useState([]);
  // const [requery, setRequery] = useState(0);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  const datasetMain = () => {
    let fi = -1;
    let lst = data.filter((v) => Number(v.sortorder) < 30 && v.prc === "");
    data
      .filter((v) => Number(v.sortorder) < 30 && v.prc === "bulk")
      .forEach((v, i) => {
        fi = lst.findIndex((l) => l.atclcode === v.atclcode);
        if (fi !== -1) {
          lst[fi].bbid = v.bid;
          lst[fi].bask = v.ask;
          lst[fi].bbidtm = v.bidtm;
          lst[fi].basktm = v.asktm;
        }
      });
    return lst;
  };

  const datasetOther = () => {
    return data.filter((v) => Number(v.sortorder) >= 30 && v.prc === "");
  };

  return (
    (alwaysShow || show.current) && (
      <Box {...other}>
        <Stack gap={2} width="100%">
          <Paper elevation={6} sx={{ padding: "0.3rem" }}>
            <TableContainer>
              {/* component={Paper} */}
              <Table size="small" aria-label="a dense table">
                {/* {props.shop === "BULK" && ( */}
                <TableHead>
                  <TableRow>
                    <TableCell align="center" bgcolor="white">
                      <Typography color={colorset[2]}>НАЗВА</Typography>
                    </TableCell>
                    {/* <TableCell width={"3px"}></TableCell> */}
                    <TableCell align="center" colSpan={2} bgcolor={colorset[0]}>
                      <Typography color={colorset[2]}>РОЗДРІБ</Typography>
                    </TableCell>
                    {/* <TableCell width={"3px"}></TableCell> */}
                    <TableCell
                      align="center"
                      colSpan={2}
                      bgcolor={colorset[1]}
                      // sx={{ backgroundColor: green[200] }}
                    >
                      <Typography color={colorset[2]}>ГУРТ</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" bgcolor="white" padding={"none"}>
                      <Typography color={grey[500]} fontSize="0.9rem">
                        валюта
                      </Typography>
                    </TableCell>
                    {/* <TableCell></TableCell> */}
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
                        {/* fontSize={"90%"}*/}
                        продаж
                      </Typography>
                    </TableCell>
                    {/* <TableCell></TableCell> */}
                    <TableCell
                      align="center"
                      padding={"none"}
                      width={"18%"}
                      bgcolor={colorset[1]}
                    >
                      <Typography color={grey[600]} fontSize="0.9rem">
                        купівля
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      padding={"none"}
                      width={"18%"}
                      bgcolor={colorset[1]}
                    >
                      <Typography color={grey[600]} fontSize="0.9rem">
                        {/* fontSize={"90%"}*/}
                        продаж
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* )} */}
                <TableBody>
                  {datasetMain().map((v) => {
                    return (
                      (Number(v.bid) !== 0 ||
                        Number(v.ask) ||
                        Number(v.bbid) !== 0 ||
                        Number(v.bask)) !== 0 && (
                        <Row id={v.atclcode} key={v.atclcode} itm={v} />
                      )
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper elevation={6} sx={{ padding: "0.3rem" }}>
            <Stack gap={0.5}>
              <Box
                bgcolor={colorset[0]}
                // color={"info.contrastText"}
                padding={"5px 10px"}
              >
                <Typography fontSize="0.9rem">РОЗДРІБ, купівля</Typography>
              </Box>
              <CurOther dataset={datasetOther()} />
            </Stack>
          </Paper>
          <Box></Box>
          {/* {error && (
            <Alert severity="error">
              <Typography> {`${error}`}</Typography>
            </Alert>
          )} */}
          {footer && (
            <Alert
              icon={false}
              severity="warning"
              sx={{ justifyContent: "center" }}
            >
              <Typography variant="caption">{footer}</Typography>
            </Alert>
          )}
        </Stack>
      </Box>
    )
  );
};

const CurAmntCell = (props) => {
  const { amnt, color, bgcolor, ...other } = props;
  return (
    <TableCell align="center" padding={"none"} bgcolor={bgcolor}>
      <Typography
        fontSize={{ xs: "1rem", md: "3vmin" }}
        color={color}
        fontWeight={other.fontWeight}
      >
        {Number(amnt) !== 0 ? Number(amnt).toPrecision(4) : ""}
      </Typography>
    </TableCell>
  );
};

const Row = (props) => {
  const { itm } = props;

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
            src={`./flag/${itm.atclcode}.svg`}
          />
          <Typography variant="button" fontSize={{ xs: "1rem", md: "3vmin" }}>
            {itm.chid}
          </Typography>
        </Stack>
      </TableCell>
      {/* <TableCell></TableCell> */}
      <CurAmntCell amnt={itm.bid} color={colorset[2]} bgcolor={colorset[0]} />
      <CurAmntCell amnt={itm.ask} color={colorset[2]} bgcolor={colorset[0]} />
      {/* <TableCell></TableCell> */}
      <CurAmntCell
        amnt={itm.bbid}
        color={colorset[2]}
        bgcolor={colorset[1]}
        fontWeight={"700"}
      />
      <CurAmntCell
        amnt={itm.bask}
        color={colorset[2]}
        bgcolor={colorset[1]}
        fontWeight={"700"}
      />
    </TableRow>
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
