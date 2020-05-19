/** communities */
exports.up = function (knex) {
  return knex.schema.createTable('communities', (t) => {
    t.increments().primary()
    t.string('name', 32).unique().notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('communities')
}
