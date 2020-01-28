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

module.exports = {
  handleGoogleMaps,
};
