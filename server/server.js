const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

const verifyToken = require("./auth/verifyToken");

// ROUTERS
const auth = require("./auth/authRouter");
server.use("/api/auth", auth);

const concerns = require("./concerns/concernsRouter");
server.use("/api/concerns", verifyToken, concerns);
// For testing
// server.use("/api/concerns", concerns);

server.get("/api", (req, res) => {
  res.status(200).json({ api: "ONLINE" });
});

module.exports = server;
