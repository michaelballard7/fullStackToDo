let express = require("express");
let app = express();
let mongoDb = require('mongodb');
const path = require("path");
let db;
let connStr = require('./config/configer')

mongoDb.connect(connStr,{useNewUrlParser:true},(err,client)=>{
  db = client.db();
  app.listen(3000, () => {
    console.log("server is running...");
  });
})

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))

});

app.post("/create-item", (req, res) => {
  console.log('console this works')
  console.log(req.body.item)
  db.collection('items').insertOne({text:req.body.item},()=>{
    res.send(
      "this end point is working <br> <a href='http://localhost:3000'>Home</a>"
    );
  })
  
});


