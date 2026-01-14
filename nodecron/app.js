require("dotenv").config();
require("./cron/staleusers.cron");
require("./cron/deletesession.js");
require("./cron/generatereport.js");
require("./cron/archieve.js");
const express = require("express");
const path=require("path");
const app = express();
const staticRoutes = require("./staticroutes");
const connection=require('./connection');
const routePath=require('./routes/app');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const staleusers=require('./routes/staleusers');
const cleanup=require('./routes/cleanup');
const report=require('./routes/generatereport');
const healthroute=require('./routes/health');
const archieve=require('./routes/archieve');
const port=3000;
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded({ extended: false }));
connection("mongodb://127.0.0.1:27017/task4")
    .then(()=>{
    console.log("mongoose connected");
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;
    db.collection('temp').insertOne({ fake: true, message: "This is a temporary document to make the database appear" }, (err, result) => {
      if (err) {
        console.log("Error inserting fake document:", err);
      } else {
        console.log("Fake document inserted - database should now appear in mongosh");
        db.collection('temp').deleteOne({ fake: true }, (err, result) => {
          if (err) {
            console.log("Error deleting fake document:", err);
          } else {
            console.log("Fake document deleted");
          }
        });
      }
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });









app.use("/",staticRoutes);
app.use("/user",routePath);


app.use('/stale',staleusers);
app.use("/cleanup", cleanup);
app.use('/report',report);
app.use('/archieve',archieve);


app.use('/health-api', healthroute);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

