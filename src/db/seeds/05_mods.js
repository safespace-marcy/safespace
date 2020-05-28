exports.seed = async function (knex) {
  await knex('moderators').del()
  return knex('moderators').insert([
    {
      user_id: 1,
      community_id: 1
    },
    {
      user_id: 1,
      community_id: 2
    },
    {
      user_id: 1,
      community_id: 3
    },
    {
      user_id: 5,
      community_id: 1
    },
    {
      user_id: 5,
      community_id: 2
    },
    {
      user_id: 5,
      community_id: 3
    }
  ])
}
