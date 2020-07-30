exports.up = function (knex) {
  return knex.schema.alterTable("concerns", (tbl) => {});
};

exports.down = function (knex) {};
