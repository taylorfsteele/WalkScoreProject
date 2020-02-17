module.exports.handleDbGet = async db => {
  try {
    const scoresRef = db.collection('scores');
    const allScores = await scoresRef.get();
    const scores = [];
    allScores.forEach(doc => {
      scores.push(doc.data());
    });
    return scores;
  } catch (error) {
    console.log(error);
    return 'getDbScore broke 😭';
  }
};
