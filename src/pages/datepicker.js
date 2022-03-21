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
import { DisponibilitiesList, BookedList } from "../utils/airtable";
import Grid from "@mui/material/Grid";

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
import { Book, CopyAll } from "@mui/icons-material";

export default function StaticDatePickerDemo() {
  let navigate = useNavigate();

  //value is the date that is selected by the user
  const [value, setValue] = React.useState(new Date());

  //slots are the available slots for the date that is chosen
  const [slots, setSlots] = React.useState([]);

  //all booked slots
  const [bookedSlots, setBookedSlots] = React.useState([]);

  //available dates (where there is at least one slot available)
  const [availableDates, setAvailableDates] = React.useState([]);

  //all slots that are really available (installer is free and not booked yet)
  const [availableSlots, setAvailableSlots] = React.useState([]);

  useEffect(() => {
    
    // get Available slots for the date that is selected
    let available_dates = [];
    let available_slots = [];
    let booked_slots = [];

    

   

    //Read all slots that are already booked
    BookedList()
      .then((result) => {
       
        result.forEach(function (record) {
          booked_slots.push(record);
        });

        setBookedSlots(booked_slots);
      })
      .then(
        //Create all possible 1hour slots based on installer schedule
        DisponibilitiesList().then((result) => {
    
          result.forEach(function (record) {
            available_dates.push(startOfDay(record.start));
            available_slots.push.apply(
              available_slots,
              eachHourOfInterval(record).slice(0, -1)
            );
          });

          // Remove the slots that were booked before
          let bookedSlotsMilliseconds = bookedSlots.map((item) =>
            item.getTime()
          ); //convert to milliseconds before comparison

          let remaining_slots = available_slots.filter(function (el) {
            return !bookedSlotsMilliseconds.includes(el.getTime());
          });

          //Unique set of Dates where there is at least one remaining slot
          //function to remove duplicates
          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }

          let remaining_dates = remaining_slots
            .map((item) => startOfDay(item))
            .filter(onlyUnique);

          console.log("remaining", remaining_dates);

          //set States
          setAvailableDates(remaining_dates);
          setAvailableSlots(remaining_slots);
        })
      );
  }, []);

  //when value change, find the slots
  useEffect(() => setSlots(getTimes(value)), [value]);

  function onSelectSlot(item) {
    //navigate to the confirmation page with the selected date as location state
    navigate("/confirm", { state: item });
  }

  function getTimes(date) {
    console.log("availableSlots", availableSlots);
    console.log("availableDates", availableDates);

    // find all the available slots on the chosen date
    var result = availableSlots.filter(function (item, index) {
      if (startOfDay(item).getTime() == startOfDay(date).getTime()) {
        return true;
      }
    });

    if (result) return result;
    else return [{ slots: [] }];
  }

  function disableDates(date) {
    //Returns true if the date needs to be disabled in the calendar
    // Check if the date is in the list of dates that are still available
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
    <Container maxWidth="md" sx={{ padding: "30px 0px 40px 0px" }}>
      <Container maxWidth="lg" sx={{ paddingY: "20px" }}>
        <img style={{ height: "30px" }} src="/images/vesta.svg" alt="Vesta" />
      </Container>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h3 style={{textAlign:"center"}}>Choisissez un créneau pour votre visite</h3>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
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
          </Grid>
          <Grid item xs={12} md={6}>
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
              <h4 style={{textAlign:"center"}}>
                {value.getDay()
                  ? format(value, "eeee dd MMMM", { locale: frLocale })
                  : ""}
              </h4>
              <Stack spacing={2} direction="column">
                {slots ? (
                  slots.map((item) => (
                    <Button
                      variant="outlined"
                      onClick={() => onSelectSlot(item)}
                    >
                      {format(item, "HH:mm", { locale: frLocale })}
                    </Button>
                  ))
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
