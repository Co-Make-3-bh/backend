const router = require("express").Router();
const bcrypt = require("bcryptjs");

const helpers = require("./authHelpers");
const db = require("../../database/usersAccess");

router.post("/register", helpers.verifyBody, async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, salt);

  const emailOutput = `
  <p>Thank you for signing up!</p>
  <h3>Registration Details</h3>
  <p>username: ${req.body.username}</p>
  <p>email: ${req.body.email}</p>
  <h3>Login now if you haven't already!</h3>
`;

  const user = {
    email: req.body.email,
    username: req.body.username,
    password: hash,
  };

  db.create(user)
    .then(async (saved) => {
      const token = await helpers.genJWT(saved);

      res.status(201).json({ data: saved, token });
    })
    .catch((err) => {
      res.status(500).json({ error: err.detail });
    });
});

module.exports = router;
