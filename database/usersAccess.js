const db = require("./dbConfig");

function create(user) {
  return db("users")
    .insert(user)
    .then((res) => {
      return db("users").where({ username: user.username }).first();
    });
}

module.exports = { create };
