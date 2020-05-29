exports.up = function (knex) {
  return knex.schema.createTable("moderators", (t) => {
    t.increments().primary();

    t.integer("community_id").notNullable();
    t.foreign("community_id").references("id").inTable("communities");

    t.integer("user_id").notNullable();
    t.foreign("user_id").references("id").inTable("users");

    t.timestamp("date_added").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("moderators");
};
