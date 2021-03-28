const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser')

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
