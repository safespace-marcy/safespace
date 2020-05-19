
exports.up = function (knex) {
  return knex.schema.createTable('community_users', (t) => {
    t.increments().primary()
    t.integer('user_id').notNullable()
    t.foreign('user_id').references('id').inTable('users')
    t.integer('community_id').notNullable()
    t.foreign('community_id').references('id').inTable('communities')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('community_users')
}
