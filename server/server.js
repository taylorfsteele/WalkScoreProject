const express = require("express");
const app = express();
const port = 3001;
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();
const admin = require("firebase-admin");
let serviceAccount = require(process.env.DB_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://walk-score-portf-1580150892683.firebaseio.com",
});

let db = admin.firestore();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //Enable on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let latLng = [];

app.get("/address", async (req, res) => {
  //TODO: Change to listen for collection===user
  db.collection("scores").onSnapshot(function(querySnapshot) {
    let scores = [];
    //Listens for any changes to the collection
    querySnapshot.forEach(function(doc) {
      scores.push(
        doc.data().walkScore,
        doc.data().bikeScore,
        doc.data().formattedAddress,
        doc.data().lastCalledTime.toDate(),
      );
    });
    console.log(scores);
  });

  //todo: Get from DB
  res.send(latLng);
});

const handleApiCall = async endpoint => {
  const res = await fetch(endpoint);
  let data = await res.json();
  return data;
};

app.post("/address", async (req, res) => {
  const enteredAddress = req.body.data.address;
  const callGoogle = await handleApiCall(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${process.env.GMAPS_API_KEY}`,
  );
  const placeID = callGoogle.results[0].place_id;
  const formattedAddress = callGoogle.results[0].formatted_address;
  const lat = callGoogle.results[0].geometry.location.lat;
  const lng = callGoogle.results[0].geometry.location.lng;
  const callWalkScore = await handleApiCall(
    `http://api.walkscore.com/score?format=json&address=${formattedAddress}&lat=${lat}&lon=${lng}&transit=1&bike=1&wsapikey=${process.env.WALK_API_KEY}`,
  );
  console.log(formattedAddress, callWalkScore);

  let firestoreData = {
    placeID: placeID,
    enteredAddress: enteredAddress,
    formattedAddress: formattedAddress,
    walkScore: callWalkScore.walkscore,
    bikeScore: callWalkScore.bike.score,
    lastCalledTime: admin.firestore.Timestamp.now(),
  };
  let setData = db
    .collection("scores")
    .doc(placeID)
    .set(firestoreData);

  res.send(["Sent!"]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
