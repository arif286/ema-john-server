const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
app.use(express.json())
require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://arifulIslam:<password>@cluster0.mnfgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
