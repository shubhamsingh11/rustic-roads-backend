import express from "express";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const travelBucketList = [
  {
    destination: "Camp Nou",
    city: "Barcelona",
    country: "Spain",
  },
  { destination: "Eiffel Tower", city: "Paris", country: "France" },
  { destination: "Colosseum", city: "Rome", country: "Italy" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/favourite-travel-destination", (req, res) => {
  res.send(travelBucketList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
