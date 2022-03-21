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
        alignItems: "center",
        flexDirection: "column",
        
        height: "auto",
        border: 1, borderColor:"grey.300", borderRadius:5,
      }}
    >
      <h4 style={{textAlign: 'center'}}>Visite technique Vesta</h4>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          paddingY: "15px"
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
              format(props.bookedslot, "eeee dd MMMM", { locale: frLocale })
              }
          </span>
          <span>  {
              format(props.bookedslot, "HH:mm", { locale: frLocale })
              }</span>
          <Link href="/booking" > Modifier la date</Link>
        </Box>
      </Box>
    </Box>
  );
}
