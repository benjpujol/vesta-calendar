import * as React from "react";
import TextField from "@mui/material/TextField";

import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { chainPropTypes } from "@mui/utils";
import { convertValueToMeridiem } from "@mui/lab/internal/pickers/time-utils";
import { useEffect } from "react";

export default function StaticDatePickerDemo() {
  
  let navigate = useNavigate();

  const [value, setValue] = React.useState(new Date());
  const [slots, setSlots] = React.useState([{ id: 0, hour: "11h-12h" }]);
  const [bookedslot, setBookedSlot] = React.useState();
  const [bookeddate, setBookedDate] = React.useState(new Date());

  function onSelectSlot(item){
    console.log(item);
    console.log("vlaue", value)
    navigate("/", {state : {slot: item.hour, date: value}});
  }

  useEffect(()=> setSlots(getTimes(value).slots), [value])

  function getTimes(date) {
    const date_times = [
      {
        date: new Date(2022, 2, 19),
        slots: [
          { id: 0, hour: "10h - 11h" },
          { id: 1, hour: "12h - 13h" },
        ],
      },
      {
        date: new Date(2022, 2, 23),
        slots: [
          { id: 0, hour: "11h - 12h" },
          { id: 1, hour: "14h - 15h" },
        ],
      },
      {
        date: new Date(2022, 2, 24),
        slots: [
          { id: 0, hour: "11h - 12h" },
          { id: 1, hour: "15h - 18h" },
        ],
      },
    ];
    var result = date_times.find(function (item, index) {
      if (item.date.getTime() == date.getTime()) {
        console.log("success", item.slots);
        return true;
      }
    });
    if (result) return result;
    else return [{ slots: [] }];
  }

  function disableDates(date) {
    // in the following array format is us month are starting from 0 till 11
    const dateInterditesRaw = [
      new Date(date.getFullYear(), 2, 19),
      new Date(date.getFullYear(), 2, 23),
      new Date(date.getFullYear(), 2, 24),
    ];

    /* make a new array with the getTime() without it date comparaison are 
    never true  */

    const dateInterdites = dateInterditesRaw.map((arrVal) => {
      return arrVal.getTime();
    });

    /*exclude all sunday and use the includes array method to check if the 
    date.getTime() value is 
    in the array dateInterdites */

    return date.getDay() === 0 || !dateInterdites.includes(date.getTime());
  }

  console.log(value.getDay());

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <h4>Choisissez un créneau</h4>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          shouldDisableDate={disableDates}
          openTo="day"
          views={["day"]}
          value={value}
          onChange={(newValue) => {
          
            setValue(newValue);
            
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box sx = {{width:"50%", mx : "auto"}}>
        <h3>
          {value.getDay()
            ? format(value, "eeee dd MMMM", { locale: frLocale })
            : ""}
        </h3>
        <Stack spacing={2} direction="column">
          {slots ? (
            slots.map((item) => (
              <Button variant="outlined" onClick={() => onSelectSlot(item)}>
                {item.hour}
              </Button>
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Box>
      </Box>
      
      </Container>
  );
}
