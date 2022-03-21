import { RecordList } from "../utils/airtable";
import { addDays, eachHourOfInterval, parseISO } from "date-fns";
import { RestaurantMenuTwoTone } from "@mui/icons-material";

export default function getAvailabilities() {
    let slots = [];
  RecordList().then((result) => {
    
    result.forEach(function (record) {
      console.log(record);
      slots.push.apply(slots, eachHourOfInterval(record).slice(0, -1));
    });
    console.log("SLOTS", slots)
    
  });
  return slots




}
