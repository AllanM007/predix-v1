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

router.get("/positions", function (req, res) {
  /**
   * THIS IS EXAMPLE CODE THAT USES HARDCODED VALUES FOR CLARITY.
   * THIS IS EXAMPLE CODE THAT USES UN-AUDITED CODE.
   * DO NOT USE THIS CODE IN PRODUCTION.
   */

  const { ethers } = require("ethers"); // for nodejs only
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_sepolia"
  );
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const addr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
  const priceFeed = new ethers.Contract(
    addr,
    aggregatorV3InterfaceABI,
    provider
  );
  priceFeed.latestRoundData().then((roundData) => {
    // Do something with roundData
    console.log("Latest Round Data", roundData);
  });

  res.sendFile(path.join(__dirname + "/public/views/positions.html"));
});

router.get("/create-position/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/create-position.html"));
});

router.get("/update-position/:string", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/views/update-position.html"));
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
