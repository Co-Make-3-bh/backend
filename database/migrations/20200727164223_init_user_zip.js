exports.up = function (knex) {
  return knex.schema.alterTable("users", (tbl) => {
    tbl.string("zip").notNullable().defaultTo("");
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn("zip");
};
