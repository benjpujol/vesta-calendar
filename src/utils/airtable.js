import Airtable from "airtable";
import { addDays, eachHourOfInterval, parseISO } from "date-fns";

// Record data
export async function RegisterToAirtable(base_key, fields) {
  // const res = await fetch("/api/register_to_airtable", {
  //   body: JSON.stringify({
  //     base_key: base_key,
  //     fields: fields,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "POST",
  // });
  // const result = await res.json();
  // return result;
  // si on fait tout en browser
  const airtable_api_key = "keyF1aNVJUbKDgXDj"; // a sécuriser
  const vercel_env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  let base_tab = "dev";
  if (vercel_env === "production") {
    base_tab = "prod";
  }
  var base = new Airtable({ apiKey: airtable_api_key }).base(base_key);
  await base(base_tab).create(
    [
      {
        fields: fields,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {});
    }
  );
  return "data registered to airtable";
}

export async function DisponibilitiesList() {
  const airtable_api_key = "keyF1aNVJUbKDgXDj";
  var base = new Airtable({ apiKey: airtable_api_key }).base(
    "appPhYilwzWEbCBZG"
  );

  return new Promise((resolve, reject) => {
    const intervals = [];
    
    base("prod")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 10,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            intervals.push({
              start: parseISO(record.get("Start")),
              end: parseISO(record.get("End")),
            });
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(intervals);
          }
        }
      );
  });
}


export async function BookedList() {
  const airtable_api_key = "keyF1aNVJUbKDgXDj";
  const vercel_env = process.env.NEXT_PUBLIC_VERCEL_ENV;

  var base = new Airtable({ apiKey: airtable_api_key }).base(
    "appabRAbNldKQvYiV"
  );

  let base_tab = "dev";
  if (vercel_env === "production") {
    base_tab = "prod";
  }

  return new Promise((resolve, reject) => {
    const intervals = [];
    base(base_tab)
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 10,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            intervals.push(parseISO(record.get("Date"))
            );
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(intervals);
          }
        }
      );
  });
}


