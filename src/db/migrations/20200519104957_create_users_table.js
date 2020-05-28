      /** users. t = table */
exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments().primary()
    t.string('username', 32).unique().notNullable()
    t.string('email', 50).unique().notNullable()
    t.text('password').notNullable()
    t.string('sprite')
    t.string('seed')
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
