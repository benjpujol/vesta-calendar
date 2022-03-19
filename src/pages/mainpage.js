import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DatePicker from "./datepicker.js";
import Form from "./nameform.js";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Appointment from './appointment_details'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function Main() {
  const [bookedslot, setBookedSlot] = React.useState();
  const [bookeddate, setBookedDate] = React.useState(new Date());

  let location = useLocation();
  console.log("location", location);

  useEffect(() => {
    // Update the document title using the browser API
    
    console.log(location.state);
    setBookedSlot(location.state.slot);
    setBookedDate(location.state.date);
    
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box sx={{ maxWidth: 'sm', mx: 'auto' }}>
              <h4>Confirmez votre réservation</h4>
              <Form bookeddate={bookeddate} bookedslot={bookedslot} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Appointment bookeddate={bookeddate} bookedslot={bookedslot}/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
