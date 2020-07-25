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

module.exports = { verifyBody };
