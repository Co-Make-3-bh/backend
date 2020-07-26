function verifyBody(req, res, next) {
  if (
    !req.body.hasOwnProperty("title") &&
    !req.body.hasOwnProperty("description") &&
    !req.body.hasOwnProperty("createdBy")
  ) {
    return res
      .status(400)
      .json({ error: "Required: title, description, and createdBy ID#" });
  } else {
    next();
  }
}

module.exports = { verifyBody };
