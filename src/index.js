import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

const app = express();
dotenv.config({ path: "./.env" });

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

connectDB();

// async () => {
//   try {
//     await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.error("ERROR", err);
//       throw err;
//     });
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`);
//     });
//   } catch (err) {
//     console.error("Error connecting to the database", err);
//     throw err;
//   }
// };
