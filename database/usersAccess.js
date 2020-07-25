const db = require("./dbConfig");

function create(user) {
  return db("users")
    .insert(user)
    .then((res) => {
      return db("users").where({ username: user.username }).first();
    });
}

function findByEmail(email) {
  return db("users").where({ email }).first();
}

module.exports = { create, findByEmail };
