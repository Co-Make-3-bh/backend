const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("../database/dbConfig");
const DBAccess = require("knex-db-access");
const db = new DBAccess(connection, "users");
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

// ROUTERS
const auth = require("./auth/authRouter");
server.use("/api/auth", auth);

server.get("/api", (req, res) => {
  res.status(200).json({ api: "ONLINE" });
});

// server.get("/api/test", (req, res) => {
//   db.find().then((result) => {
//     res.status(200).json({ data: result });
//   });
// });

module.exports = server;
