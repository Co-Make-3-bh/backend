exports.up = function (knex) {
  return knex.schema.alterTable("concerns", (tbl) => {
    tbl.string("zip").notNullable().defaultTo("");
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn("concerns");
};
