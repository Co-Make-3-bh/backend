exports.up = function (knex) {
  return knex.schema.createTable("likes_for_concerns", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    tbl
      .integer("concern_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("concerns");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("likes_for_concerns");
};
