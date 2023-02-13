import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FundersList = ({ funders }) => {
  function createData(name, message, funderAddress, timestamp) {
    return { name, message, funderAddress, timestamp };
  }

  const rows = [];

  funders.forEach((funder) => {
    rows.push(
      createData(
        funder.name,
        funder.message,
        funder.funderAddress,
        funder.timestamp
      )
    );
  });

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Typography variant="h4" color="#9e6c26">
        Funders messages:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Message</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="right">Funder&nbsp;address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.reverse().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.message}</TableCell>
                <TableCell align="left">{row.timestamp}</TableCell>
                <TableCell align="right">{row.funderAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FundersList;
