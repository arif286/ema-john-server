const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mnfgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors())


client.connect((err) => {
  const collection = client.db("emaJohnStore").collection("products");
    app.post('/addProduct', (req, res) => {
        const products = req.body;
        collection.insertMany(products)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount)
        })
  })

});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
