const express = require("express");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

// eslint-disable-next-line import/no-dynamic-require
const serviceAccount = require(process.env.DB_KEY_PATH);

const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow on Local
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = admin.firestore();
const handleDbGet = async () => {
  const scoresRef = db.collection("scores");
  const allScores = await scoresRef.get();
  const scores = [];
  allScores.forEach(doc => {
    scores.push(doc.data());
  });
  return scores;
};

const handleApiCall = async endpoint => {
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
};

app.get("/address", async (req, res) => {
  try {
    const response = await handleDbGet();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete", async (req, res) => {
  const { placeID } = req.body;
  db.collection("scores")
    .doc(placeID)
    .delete();
  const response = await handleDbGet();
  res.send(response);
});

app.post("/address", async (req, res) => {
  const enteredAddress = req.body.data.address;
  const callGoogle = await handleApiCall(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${process.env.GMAPS_API_KEY}`,
  );
  const placeID = callGoogle.results[0].place_id;
  const formattedAddress = callGoogle.results[0].formatted_address;
  const { lat } = callGoogle.results[0].geometry.location;
  const { lng } = callGoogle.results[0].geometry.location;
  const callWalkScore = await handleApiCall(
    `http://api.walkscore.com/score?format=json&address=${formattedAddress}&lat=${lat}&lon=${lng}&transit=1&bike=1&wsapikey=${process.env.WALK_API_KEY}`,
  );

  const firestoreData = {
    placeID,
    enteredAddress,
    formattedAddress,
    walkScore: callWalkScore.walkscore,
    bikeScore: callWalkScore.bike.score,
    lastCalledTime: admin.firestore.Timestamp.now(),
  };
  const setData = db
    .collection("scores")
    .doc(placeID)
    .set(firestoreData);

  const response = await handleDbGet();
  res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
