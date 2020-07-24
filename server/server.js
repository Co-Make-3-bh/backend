const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

module.exports = server;
