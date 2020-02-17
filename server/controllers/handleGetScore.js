const handleGetScore = (db, getDbScores, handleApiCall, admin) => async (req, res) => {
  try {
    const enteredAddress = req.body.data.address;
    const callGoogle = await handleApiCall.handleApiCall(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${process.env.GMAPS_API_KEY}`
    );
    const placeID = callGoogle.results[0].place_id;
    const formattedAddress = callGoogle.results[0].formatted_address;
    const { lat } = callGoogle.results[0].geometry.location;
    const { lng } = callGoogle.results[0].geometry.location;
    const callWalkScore = await handleApiCall.handleApiCall(
      `http://api.walkscore.com/score?format=json&address=${formattedAddress}&lat=${lat}&lon=${lng}&transit=1&bike=1&wsapikey=${process.env.WALK_API_KEY}`
    );

    const firestoreData = {
      placeID,
      enteredAddress,
      formattedAddress,
      walkScore: callWalkScore.walkscore,
      bikeScore: callWalkScore.bike.score,
      lastCalledTime: admin.firestore.Timestamp.now()
    };
    db.collection('scores')
      .doc(placeID)
      .set(firestoreData);

    const response = await getDbScores.handleDbGet(db);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleGetScore
};
