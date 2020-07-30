exports.up = function (knex) {
  return knex.schema.alterTable("users", (tbl) => {});
};

exports.down = function (knex) {
  return knex.schema.dropColumn("zip");
};
