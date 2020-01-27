const googleMapsClient = require('../node_modules/@google/maps').createClient({
    key: 'AIzaSyADKMidjrKApBjB9OdRQ-NclizKk-dMzcs',
    Promise: Promise
});


const handleGoogleMaps = (req, res) => {
    const address = req.body.data.address
    googleMapsClient.geocode({ address: address })
        .asPromise()
        .then((response) => {
            console.log(response.json.results);
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = {
    handleGoogleMaps
}