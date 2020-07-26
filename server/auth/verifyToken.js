const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ error: "ACCESS DENIED" });
  } else {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    if (decoded) {
      req.body.token = token;
      next();
    } else {
      res.status(400).json({ error: "Could not verify token" });
    }
  }
};
