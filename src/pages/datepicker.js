import * as React from "react";
import TextField from "@mui/material/TextField";

import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { RecordList } from "../utils/airtable";

import {
  addDays,
  eachHourOfInterval,
  parseISO,
  endOfDay,
  startOfDay,
} from "date-fns";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { chainPropTypes } from "@mui/utils";
import { convertValueToMeridiem } from "@mui/lab/internal/pickers/time-utils";
import { useEffect } from "react";
import { CopyAll } from "@mui/icons-material";

export default function StaticDatePickerDemo() {
  let navigate = useNavigate();

  const [value, setValue] = React.useState(new Date());
  const [slots, setSlots] = React.useState([]);
  const [bookedslot, setBookedSlot] = React.useState();
  const [bookeddate, setBookedDate] = React.useState(new Date());

  const [availableDates, setAvailableDates] = React.useState([]);
  const [availableSlots, setAvailableSlots] = React.useState([]);

  useEffect(() => {
    console.log('getTimes', getTimes(value))
    setSlots(getTimes(value));

    let available_dates = [];
    let available_slots = [];

    RecordList().then((result) => {
      result.forEach(function (record) {
        console.log(startOfDay(record.start));
        available_dates.push(startOfDay(record.start));
        available_slots.push.apply(
          available_slots,
          eachHourOfInterval(record).slice(0, -1)
        );
      });
      console.log("Available dates", available_dates);
      console.log("Available slots", available_slots);
      setAvailableDates(available_dates);
      setAvailableSlots(available_slots);
    });
  }, [value]);

  function onSelectSlot(item) {
    console.log("item to send", item);
    navigate("/confirm", { state: item } );
  }

  function getTimes(date) {
    console.log("availableSlots", availableSlots);
    console.log("date", date);
    var result = availableSlots.filter(function (item, index) {
      if (startOfDay(item).getTime() == startOfDay(date).getTime()) {
        console.log("success", item);
        return true;
      }
    });

    

    if (result) return result;
    else return [{ slots: [] }];
  }

  function disableDates(date) {
    // in the following array format is us month are starting from 0 till 11
    /* make a new array with the getTime() without it date comparaison are 
    never true  */

    let availableDatesMilliseconds = availableDates.map((item) =>
      item.getTime()
    );

    return (
      date.getDay() === 0 ||
      !availableDatesMilliseconds.includes(date.getTime())
    );
  }

  return (
    <Container maxWidth="sm" sx={{ padding: "30px 0px 0px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <h3>Choisissez un créneau pour votre visite</h3>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              shouldDisableDate={disableDates}
              openTo="day"
              minDate={new Date()}
              maxDate={addDays(new Date(), 15)}
              views={["day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            width: "50%",
            mx: "auto",
            justifyContent: "flex-start",
          }}
        >
          <h4>
            {value.getDay()
              ? format(value, "eeee dd MMMM", { locale: frLocale })
              : ""}
          </h4>
          <Stack spacing={2} direction="column">
            {slots ? (
              slots.map((item) => (
                <Button variant="outlined" onClick={() => onSelectSlot(item)}>
                  {format(item, "HH:mm", { locale: frLocale })}
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
