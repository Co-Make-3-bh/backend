exports.up = function (knex) {
  return knex.schema.createTable("likes_for_concerns", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("concern_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("concerns")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("likes_for_concerns");
};
