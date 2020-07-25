const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

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

module.exports = server;
