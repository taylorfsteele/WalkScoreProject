const handleDelete = (db, getDbScores) => async (req, res) => {
  try {
    const { placeID } = req.body;
    db.collection('scores')
      .doc(placeID)
      .delete();
    const response = await getDbScores.handleDbGet(db);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleDelete
};
