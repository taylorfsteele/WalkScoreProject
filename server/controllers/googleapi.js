const googleMapsClient = require("../node_modules/@google/maps").createClient({
  key: "APIKEY",
  Promise: Promise,
});

const handleGoogleMaps = (req, res) => {
  //TODO Move API call to this controller
  console.log(req.body.data.address);
};
module.exports = {
  handleGoogleMaps,
};
