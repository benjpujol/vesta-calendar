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
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import frLocale from "date-fns/locale/fr";


export default function Success() {
  let location = useLocation();
  let params = useParams();

  const [bookedslot, setBookedSlot] = React.useState(new Date());

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
      <Container maxWidth="md" sx = {{paddingTop:"20px"}}><img
                    style={{height: "30px"}}
                    src="/images/vesta.svg"
                    alt="Vesta"
                  /></Container>
      <Container maxWidth="md" sx = {{paddingTop:"30px", textAlign:"center"}}>
        <h4>Merci d'avoir réservé votre visite le {
              format(bookedslot, "eeee dd MMMM", { locale: frLocale })
              }  à   {format(bookedslot, "HH:mm", { locale: frLocale })}</h4>
            <p>Vous allez recevoir une invitation sur votre boîte mail.</p>
      </Container>
    </React.Fragment>
  );
}
