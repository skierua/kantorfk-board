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

const bulkKnt = "BULK";

const colorset = ["#f2f2f2", "#57ba98", grey[800]];
/**
 *
 * @param {*} shop str
 * @param {*} delay int refresh interval in sec
 * @returns
 */
export const BrdRate = (props) => {
  const { data, shop, footer, ...other } = props;
  // console.log(
  //   data.filter((v) => v.shop == bulkKnt && v.domestic == "2" && v.prc === "")
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
          <TblTbl
            data={data.filter(
              (v) => v.shop === shop && v.domestic === "2" && v.prc === ""
            )}
            bulk={false}
          />
          <TblTbl
            data={data.filter(
              (v) => v.shop === bulkKnt && v.domestic === "2" && v.prc === ""
            )}
            bulk={true}
          />
        </Stack>
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
  );
};

const CurAmntCell = (props) => {
  const { amnt, color, fontWeight, ...other } = props;
  return (
    <TableCell align="center" {...other}>
      <Typography
        fontSize={{ xs: "1rem", md: "3vmin" }}
        color={color}
        fontWeight={fontWeight}
      >
        {Number(amnt) !== 0 ? Number(amnt).toPrecision(4) : ""}
      </Typography>
    </TableCell>
  );
};

const Row = (props) => {
  const { itm, bulk } = props;

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
          {!bulk && (
            <Typography variant="button" fontSize={{ xs: "1rem", md: "3vmin" }}>
              {itm.chid}
            </Typography>
          )}
          {bulk && (
            <Stack gap={2} direction={"row"} alignItems={"center"}>
              <Typography
                variant="button"
                fontSize={{ xs: "1rem", md: "3vmin" }}
              >
                {itm.chid}
              </Typography>
              {itm.sname}
            </Stack>
          )}
        </Stack>
      </TableCell>
      <CurAmntCell
        amnt={itm.bid}
        color={colorset[2]}
        fontWeight={bulk ? "700" : "400"}
        bgcolor={colorset[0]}
        width={"27%"}
      />
      <CurAmntCell
        amnt={itm.ask}
        color={colorset[2]}
        fontWeight={bulk ? "700" : "400"}
        bgcolor={colorset[0]}
        width={"27%"}
      />
    </TableRow>
  );
};

const TblHead = (props) => {
  const { bulk } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          colSpan={3}
          bgcolor={bulk ? colorset[1] : colorset[0]}
        >
          <Typography color={colorset[2]} fontWeight={bulk ? "700" : "400"}>
            {bulk ? "ГУРТ" : "РОЗДРІБ"}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" bgcolor="white" padding={"none"}>
          <Typography color={grey[500]} fontSize="0.9rem">
            валюта
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
    </TableHead>
  );
};

const TblTbl = (props) => {
  const { data, bulk, ...other } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TblHead bulk={bulk} />
        <TableBody>
          {data.map((v) => {
            return (
              (Number(v.bid) !== 0 || Number(v.ask)) && (
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
