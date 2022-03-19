import Airtable from "airtable";

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