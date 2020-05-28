exports.seed = async function (knex) {
  await knex('communities').del()

  return knex('communities').insert([
    {
      owner_id: 1,
      name: 'mindful_morning',
      display_name: "Mindful Morning",
      headline: "Mindfulness helps us cope with our feelings. Join us to share mindful practice stories, tips, and resources!",
      description: "Coming soon!"
    },
    {
      owner_id: 1,
      name: 'home_warriors',
      display_name: 'Home Warriors',
      headline: 'Join us in sharing our experiences with domestic violence',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sprite: 'jdenticon',
      seed: '234dwd'
    },
    {
      owner_id: 2,
      name: 'healing_giants',
      display_name: 'Healings Giants',
      headline: 'Healing Giants have magical powers of recovery from serious illness',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      sprite: 'jdenticon',
      seed: '56jk45j'
    },
    {
      owner_id: 1,
      name: 'cheers_family',
      display_name: 'Cheers, Family!',
      headline: 'We hold each other accountable to drinking responsibly or staying sober!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sprite: 'jdenticon',
      seed: '3543KKFd'
    }
  ])
}
