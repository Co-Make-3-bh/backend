const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verifyBody(req, res, next) {
  if (
    !req.body.hasOwnProperty("username") &&
    !req.body.hasOwnProperty("password") &&
    !req.body.hasOwnProperty("email")
  ) {
    return res.status(400).json({ error: "Required: Username and Password" });
  } else {
    next();
  }
}

async function genJWT(user) {
  const secret = process.env.JWT_SECRET;

  const payload = {
    id: user.id,
    username: user.username,
  };
  const token = await jwt.sign(payload, secret);
  return token;
}

async function verifyPassword(password, hash) {
  const verified = await bcrypt.compareSync(password, hash);
  return verified;
}

module.exports = { verifyBody, genJWT, verifyPassword };
