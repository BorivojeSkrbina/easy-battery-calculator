const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const cellsRoutes = require("./routes/cells")

const app = express();

mongoose.connect("mongodb+srv://borivoje:" + process.env.MONGO_ATLAS_PW + "@cluster0-oslvo.mongodb.net/easy-18650?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // ovo ne mora
app.use("/images", express.static(path.join("images"))); // na serveru treba da je samo images


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use("/api/cells", cellsRoutes);



module.exports = app;