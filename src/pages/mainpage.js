import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DatePicker from "./datepicker.js";
import Form from "./nameform.js";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Form />
            </Grid>
            <Grid item xs={4}>
              <DatePicker />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
