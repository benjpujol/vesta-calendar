import * as React from "react";
import Box from "@mui/material/Box";
import { AccessTime } from "@mui/icons-material";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import frLocale from "date-fns/locale/fr";
import Link from '@mui/material/Link';



export default function Appointment(props) {
  console.log(props.bookeddate)
   
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <h5>Visite technique Vesta</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <AccessTime fontSize="small" sx={{'margin-right': "5px"}} />

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <span>
            {
              format(props.bookeddate, "eeee dd MMMM", { locale: frLocale })
              }
          </span>
          <span>{props.bookedslot}</span>
          <Link href="/booking" > Modifier la date</Link>
        </Box>
      </Box>
    </Box>
  );
}
