<<<<<<< HEAD
const googleMapsClient = require("../node_modules/@google/maps").createClient({
  key: "APIKEY",
  Promise: Promise,
});

const handleGoogleMaps = (req, res) => {
  //TODO Move API call to this controller
  console.log(req.body.data.address);
};
=======
require("dotenv").config();

const googleMapsClient = require("../node_modules/@google/maps").createClient({
  key: process.env.API_KEY,
  Promise: Promise,
});

const handleGoogleMaps = async (req, res) => {
  const address = req.body.data.address;
  const geoLocation = await googleMapsClient.geocode({ address: address });
  return { geoLocation };

  // googleMapsClient
  //   .geocode({ address: address })
  //   .asPromise()
  //   .then(response => {
  //     res.send(response.json.results);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

>>>>>>> d0a82d5b643127e1c75436ad54d2f4f6abed2243
module.exports = {
  handleGoogleMaps,
};
