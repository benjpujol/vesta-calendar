import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Form from "./nameform.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Appointment from "./appointment_details";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { addHours } from "date-fns";


export default function Main() {
  let location = useLocation();
  let params = useParams();



  const [bookedslot, setBookedSlot] = React.useState(new Date());
  

  

  useEffect(() => {
    // Update the document title using the browser API

    console.log(location.state);
    if (location.state) setBookedSlot(location.state);
      
    else{
      let default_date = new Date(parseInt(params.date));
    
      setBookedSlot(default_date);
    };
  }, [location.state] );

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" , marginTop:"20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box sx={{ maxWidth: "sm", mx: "auto" }}>
                <h4>Confirmez votre réservation</h4>
                <Form  bookedslot={bookedslot} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Appointment bookedslot={bookedslot} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
