exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("concerns")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("concerns").insert([
        {
          id: 0,
          title: "Greatest Concern",
          description: "concern seed 1",
          createdBy: 0,
        },
      ]);
    });
};
