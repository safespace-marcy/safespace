
exports.up = function (knex) {
  return knex.schema.createTable('likes', (t) => {
    t.increments().primary()
    t.integer('user_id').notNullable()
    t.foreign('user_id').references('id').inTable('users')
    t.integer('post_id').notNullable()
    t.foreign('post_id').references('id').inTable('posts')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('likes')
}
