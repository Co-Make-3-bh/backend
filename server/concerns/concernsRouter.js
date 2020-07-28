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

DBAccess.prototype.addUpvote = function (postId, upvotes) {
  return this.db(this.table).update({ upvotes: upvotes }).where({ id: postId });
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

router.put("/:postId", (req, res) => {
  db.editConcern(req.body, req.params.postId)
    .then((result) => {
      res.status(201).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:postId", (req, res) => {
  db.delete(req.params.postId)
    .then((result) => {
      res
        .status(204)
        .json({ data: `Post Deleted with id of ${req.params.postId}` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/upvotes/:postId", async (req, res) => {
  const postBefore = await db.findBy({ id: req.params.postId });

  if (!postBefore) {
    return res.status(404).json({ error: "No Post Found" });
  }

  db.addUpvote(req.params.postId, postBefore.upvotes + 1)
    .then((result) => {
      db.findBy({ id: req.params.postId })
        .then((post) => {
          return res.status(201).json({ data: post });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
