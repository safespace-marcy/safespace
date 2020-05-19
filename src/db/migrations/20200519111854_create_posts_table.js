
exports.up = function (knex) {
  return knex.schema.createTable('posts', (t) => {
    t.increments().primary()
    t.string('title', 72).notNullable()
    t.text('content').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.integer('user_id').notNullable()
    t.foreign('user_id').references('id').inTable('users')
    t.integer('community_id').notNullable()
    t.foreign('community_id').references('id').inTable('communities')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
