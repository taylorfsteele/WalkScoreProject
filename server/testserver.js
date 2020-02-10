const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //Enable on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const googleMapsClient = require("./node_modules/@google/maps").createClient({
  key: process.env.API_KEY,
});

async function handleGoogleMaps(data) {
  const address = data.data.address;
  const coolAddress = await googleMapsClient.geocode({ address: address }, (err, response) => {
    if (!err && response.status === 200) {
      return response.json.results;
    }
  });
  console.log(coolAddress);
  // return { newAddress };
}

app.post("/test", async (req, res) => {
  console.log("test hit");
  const getGeo = await handleGoogleMaps(req.body);
  res.send(getGeo);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
