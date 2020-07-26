const router = require("express").Router();

const connection = require("../../database/dbConfig");
const DBAccess = require("knex-db-access");
const db = new DBAccess(connection, "concerns");

const helpers = require("./concernHelpers");

router.get("/", (req, res) => {
  db.find()
    .then((concerns) => {
      res.status(200).json({ data: concerns });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", helpers.verifyBody, (req, res) => {
  db.create(req.body)
    .then((saved) => {
      res.status(201).json({ data: saved });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
