exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 0,
          username: "Admin",
          password: "example",
          email: "legendarycomedy1@gmail.com",
        },
      ]);
    });
};
