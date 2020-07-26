exports.up = function (knex) {
  return knex.schema.createTable("concerns", (tbl) => {
    tbl.increments();
    tbl.string("title").notNullable();
    tbl.string("description").notNullable();
    tbl.integer("upvotes").unsigned().defaultTo(0);
    tbl
      .integer("createdBy")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("concerns");
};
