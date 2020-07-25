const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helpers = require("./authHelpers");
const db = require("../../database/usersAccess");

router.post("/register", helpers.verifyBody, async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, salt);

  const user = {
    email: req.body.email,
    username: req.body.username,
    password: hash,
  };

  db.create(user)
    .then((saved) => {
      res.status(201).json({ data: saved });
    })
    .catch((err) => {
      res.status(500).json({ error: err.detail });
    });
});

module.exports = router;
