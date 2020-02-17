const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const handleApiCall = require('./controllers/handleApiCall');
const getDbScores = require('./controllers/getDbScores');
const handleDelete = require('./controllers/handleDelete');
const handleGetScore = require('./controllers/handleGetScore');
require('dotenv').config();

const serviceAccount = require(process.env.DB_KEY_PATH);
const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});
const db = admin.firestore();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow on Local
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE'); // Allow DELETE method
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Initial scores on load. Re-uses same DB update function for other routes.
app.get('/scores', async (req, res) => {
  const getScoresPromise = await getDbScores.handleDbGet(db);
  res.send(getScoresPromise);
});
// Shorthand, req & res are passed automatically. Call them in controller function
app.delete('/delete', handleDelete.handleDelete(db, getDbScores));
app.post('/address', handleGetScore.handleGetScore(db, getDbScores, handleApiCall, admin));

app.listen(port, () => console.log(`NodeJS server is running on ${port}.`));
