const router = require("express").Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const helpers = require("./authHelpers");
const db = require("../../database/usersAccess");

const connection = require("../../database/dbConfig");
const DBAccess = require("knex-db-access");
likesDB = new DBAccess(connection, "likes_for_concerns");

DBAccess.prototype.findLikes = function (userId) {
  return this.db(this.table).where({ user_id: userId });
};

router.post("/register", helpers.verifyBody, async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, salt);

  //   const emailOutput = `
  //   <p>Thank you for signing up for CoMake!</p>
  //   <h3>Registration Details</h3>
  //   <p>username: ${req.body.username}</p>
  //   <p>email: ${req.body.email}</p>
  //   <h3>Login now if you haven't already!</h3>
  // `;

  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "comakenotifier@gmail.com",
  //       pass: "comakepassword",
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //   });

  // let mailOptions = {
  //   from: '"Contact" <comakenotifier@gmail.com>',
  //   to: req.body.email,
  //   subject: "Thank You For Registering For CoMake!",
  //   text: "",
  //   html: emailOutput,
  // };

  const user = {
    email: req.body.email,
    username: req.body.username,
    password: hash,
    zip: req.body.zip,
  };

  db.create(user)
    .then(async (saved) => {
      // await transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return console.log(error);
      //   }
      // });
      const token = await helpers.genJWT(saved);

      res.status(201).json({ data: saved, token });
    })
    .catch((err) => {
      res.status(500).json({ error: err.detail });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.findByEmail(email);
  if (!user) {
    return res.status(400).json({ error: "Email Or Password is Incorrect" });
  }

  const liked = await likesDB.findLikes(user.id);

  const verified = await helpers.verifyPassword(password, user.password);

  if (!verified) {
    return res.status(400).json({ error: "Email Or Password is Incorrect" });
  }

  const token = await helpers.genJWT(user);

  const toSend = {
    username: user.username,
    email: user.email,
    id: user.id,
    zip: user.zip,
  };

  res.status(200).json({ data: toSend, token, liked });
});

module.exports = router;
