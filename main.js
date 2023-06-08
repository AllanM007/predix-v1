require("dotenv").config();
const os = require("os");
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");

const router = express.Router();
const { json, response } = require("express");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(express.raw());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10000kb",
  })
);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

router.get("/price-feeds", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/price-feeds.html"));
});

router.get("/reserve-feeds", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/reserve-feeds.html"));
});

router.get("/create-positions", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/create-position.html"));
});

router.get("/update-position", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

if (process.env.NODE_ENV === "development") {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static(__dirname + "/public"));

//add the router
app.use("/", router);
app.listen(process.env.port || 4040);

console.log("Running at Port 4040");
