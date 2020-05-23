
exports.up = function(knex) {
  return knex.schema.createTable('comments', (t) => {
    t.increments().primary()
    t.text('content').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.integer('user_id').notNullable()
    t.foreign('user_id').references('id').inTable('users')
    t.integer('post_id').notNullable()
    t.foreign('post_id').references('id').inTable('posts')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
