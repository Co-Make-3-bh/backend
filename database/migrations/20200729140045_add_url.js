exports.up = function (knex) {
  return knex.schema.alterTable("concerns", (tbl) => {
    tbl.string("imageURL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn("imageURL");
};
