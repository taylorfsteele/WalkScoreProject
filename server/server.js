const express = require("express");
const app = express();
const port = 3001;
const googleapi = require("./controllers/googleapi");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //Enable on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/address", async (req, res) => {
  const address = [
    {
      address: "1234 Street Drive",
      score: 95,
    },
  ];
  //todo: Get from DB
  res.send(address);
});

app.post("/address", async (req, res) => {
  console.log(req.body.data.address);
  googleapi.handleGoogleMaps(req, res);
  res.send(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
