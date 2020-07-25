const knex = require("knex");

require("dotenv").config();

const knexConfig = require("../knexfile");

const env = process.env.NODE_ENV;

module.exports = knex(knexConfig[env]);
