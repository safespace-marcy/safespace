/** communities */
exports.up = function (knex) {
  return knex.schema.createTable('communities', t => {
    t.increments().primary()
    t.integer('owner_id').notNullable()
    t.foreign('owner_id')
      .references('id')
      .inTable('users')
    t.string('name', 32)
      .unique()
      .notNullable()
    t.string('display_name').notNullable()
    t.string('headline').notNullable()
    t.text('description')
    t.string('sprite')
    t.string('seed')
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('communities')
}