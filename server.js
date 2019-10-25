let express = require("express");
let app = express();
let mongoDb = require("mongodb");
const path = require("path");
let db;
let connStr = require("./config/configer");

mongoDb.connect(connStr, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error("an error occured", err);
  } else {
    db = client.db();
    app.listen(3000, () => {
      console.log("server is running...");
    });
  }
});

// neccessary express middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  db.collection("items")
    .find()
    .toArray((err, items) => {
      res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple To-Do App</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">Michael's Daily Do List</h1>

      <div class="jumbotron p-3 shadow-sm">
        <form id="create-form" action="/create-item" method="POST">
          <div class="d-flex align-items-center">
            <input
              autofocus
              id="create-field"
              autocomplete="off"
              class="form-control mr-3"
              name="item"
              type="text"
              style="flex: 1;"
              placeholder="Please enter an item"
            />
            <button class="btn btn-success">Add New Item</button>
          </div>
        </form>
      </div>
      <ul id="item-list" class="list-group pb-5">
      </ul>
    </div>
    <script>
        // converts to an array of objects
        let items = ${JSON.stringify(items)}
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="app.js"> 
    </script>
  </body>
</html>
`);
    });
});

app.post("/create-item", (req, res) => {
  db.collection("items").insertOne({ text: req.body.item }, (err, info) => {
    // allow the server to return data for last entry
    res.json(info.ops[0]);
  });
});

app.post("/update-item", (req, res) => {
  console.log("this endpoint works");
  db.collection("items").findOneAndUpdate(
    { _id: new mongoDb.ObjectId(req.body.id) },
    { $set: { text: req.body.text } },
    () => {
      try {
        res.redirect("/");
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    }
  );
});

app.post("/delete-item", (req, res) => {
  db.collection("items").deleteOne(
    { _id: new mongoDb.ObjectId(req.body.id) },
    () => {
      res.send("recieved");
    }
  );
});
