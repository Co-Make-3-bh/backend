const router = require("express").Router();

const connection = require("../../database/dbConfig");
const DBAccess = require("knex-db-access");
const db = new DBAccess(connection, "concerns");

router.get("/", (req, res) => {
  db.find()
    .then((concerns) => {
      res.status(200).json({ data: concerns });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
