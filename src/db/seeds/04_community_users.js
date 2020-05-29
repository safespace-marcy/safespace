exports.seed = async function (knex) {
  await knex("community_users").del();

  return knex("community_users").insert([
    {
      user_id: 1,
      community_id: 1,
    },
    {
      user_id: 2,
      community_id: 1,
    },
    {
      user_id: 3,
      community_id: 1,
    },
    {
      user_id: 4,
      community_id: 2,
    },
    {
      user_id: 5,
      community_id: 2,
    },
    {
      user_id: 6,
      community_id: 2,
    },
    {
      user_id: 7,
      community_id: 3,
    },
    {
      user_id: 8,
      community_id: 3,
    },
    {
      user_id: 9,
      community_id: 3,
    },
  ]);
};
