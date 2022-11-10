const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// mideleWares

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tlsdvvb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("onlineService").collection("services");
    const reviews = client.db("onlineService").collection("reviews");

    app.get("/services", async (req, res) => {
      const query = {};
      limit = 3;
      const cursor = serviceCollection.find(query).limit(limit);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/all-services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    app.get("/addreview/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    app.get("/allreviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { serviceid: id };
      const cursor = reviews.find(query);
      const revieww = await cursor.toArray();
      res.send(revieww);
    });

    // my reviews
    app.get("/myreviews", async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }

      const cursor = reviews.find(query);
      const myreview = await cursor.toArray();
      res.send(myreview);
    });

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviews.insertOne(review);
      res.send(result);
    });

    app.delete('/myreviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviews.deleteOne(query);
      res.send(result);
  })


  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("panda master server is running");
});

app.listen(port, () => {
  console.log(`panda master server running on ${port}`);
});
