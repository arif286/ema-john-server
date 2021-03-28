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
  const productCollections = client.db("emaJohnStore").collection("products");
  const ordersCollections = client.db("emaJohnStore").collection("orders");

    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productCollections.insertOne(products)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount)
        })
    })
    app.get("/products", (req, res) => {
      productCollections.find({}).toArray((err, documents) => {
        res.send(documents);
      });
    });

    app.get("/product/:key", (req, res) => {
      productCollections.find({key: req.params.key}).toArray((err, documents) => {
        res.send(documents[0]);
      });
    });

  app.post('/getSomeProducts', (req, res) => {
    const productKeys = req.body
    productCollections.find({ key: { $in: productKeys } })
      .toArray((err, documents) => {
      res.send(documents)
    })
  })

  app.post("/addOrder", (req, res) => {
    const orderProducts = req.body;
    ordersCollections.insertOne(orderProducts).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });


});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT||port);
