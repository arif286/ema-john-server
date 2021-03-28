const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
app.use(express.json())
require('dotenv').config()


const MongoClient = require("mongodb").MongoClient;
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mnfgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const products = client.db("emaJohnStore").collection("products");
    app.post('/addProduct', (req, res) => {
        const product = req.body;
      products.insertOne()
  })

});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
