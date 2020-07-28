const router = require("express").Router();

const connection = require("../../database/dbConfig");
const DBAccess = require("knex-db-access");
const db = new DBAccess(connection, "concerns");

DBAccess.prototype.getUserConcerns = function (userId) {
  return this.db.select("*").from(this.table).where({ createdBy: userId });
};

DBAccess.prototype.getByZip = function (zip) {
  return this.db.select("*").from(this.table).where({ zip: zip });
};

DBAccess.prototype.editConcern = function (updates, postId) {
  return this.db(this.table).update(updates).where({ id: postId });
};

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

router.get("/byZip/:zip", (req, res) => {
  db.getByZip(req.params.zip)
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

router.get("/createdBy/:userId", (req, res) => {
  db.getUserConcerns(req.params.userId)
    .then((concerns) => {
      res.status(200).json({ data: concerns });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});



module.exports = router;
