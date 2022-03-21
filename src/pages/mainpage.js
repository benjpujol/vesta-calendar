import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Form from "./nameform.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Appointment from "./appointment_details";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addHours } from "date-fns";



export default function Main() {
  let location = useLocation();
  let params = useParams();

  const [bookedslot, setBookedSlot] = React.useState(new Date());
  let navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API

    console.log(location.state);
    if (location.state) setBookedSlot(location.state);
    else {
      let default_date = new Date(parseInt(params.date));

      setBookedSlot(default_date);
    }
  }, [location.state]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" sx = {{paddingY:"20px"}}><img
                    style={{height: "30px"}}
                    src="/images/vesta.svg"
                    alt="Vesta"
                  /></Container>
      <Container maxWidth="md" sx = {{paddingY:"30px"}}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            
          >
            <Box sx={{
              mx: "auto",
              
              border: 1,
              borderColor: "grey.300",
              borderRadius: 5,
              paddingBottom: "30px"
            }}>
            <h4 style={{ textAlign: "center" }}>Confirmez votre réservation</h4>
            <Form bookedslot={bookedslot} navigate={navigate} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Appointment bookedslot={bookedslot} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
