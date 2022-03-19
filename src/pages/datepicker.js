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
import { AccessTime } from "@mui/icons-material";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { chainPropTypes } from "@mui/utils";

export default function StaticDatePickerDemo() {
  const [value, setValue] = React.useState(new Date());
  const [slots, setSlots] = React.useState([{ id: 0, hour: "11h-12h" }]);
  const [bookedslot, setBookedSlot] = React.useState();
  const [bookeddate, setBookedDate] = React.useState(new Date());

  function getTimes(date) {
    const date_times = [
      {
        date: new Date(2022, 2, 19),
        slots: [
          { id: 0, hour: "10h-11h" },
          { id: 1, hour: "12h-13h" },
        ],
      },
      {
        date: new Date(2022, 2, 23),
        slots: [
          { id: 0, hour: "11h-12h" },
          { id: 1, hour: "14h-15h" },
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
      new Date(date.getFullYear(), 3, 8),
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
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          shouldDisableDate={disableDates}
          openTo="day"
          views={["day"]}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setSlots(getTimes(value).slots);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box>
        <h3>
          {value.getDay()
            ? format(value, "eeee dd MMMM", { locale: frLocale })
            : ""}
        </h3>
        <Stack spacing={2} direction="column">
          {slots ? (
            slots.map((item) => (
              <Button variant="outlined" onClick={() => {setBookedSlot(item.hour); setBookedDate(value)}}>
                {item.hour}
              </Button>
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Box>
      <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
       
      >
        <h5>Visite technique Vesta</h5>
        <Box  sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
            }}>
          <AccessTime fontSize="small" />
       
          <Box sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}>
            <span>
              {value.getDay()
                ? format(bookeddate, "eeee dd MMMM", { locale: frLocale })
                : ""}
            </span>
            <span>{bookedslot}</span>
            <Link href='/'> Modifer la date</Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
