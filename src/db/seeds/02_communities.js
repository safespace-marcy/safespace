exports.seed = async function (knex) {
  await knex("communities").del();

  return knex("communities").insert([
    {
      owner_id: 3,
      name: "mindful_morning",
      display_name: "Mindful Morning",
      headline:
        "Mindfulness helps us cope with our feelings. Join us to share mindful practice stories, tips, and resources!",
      description:
        "Welcome to Mindful Morning! This community was inspired by my morning rituals that have helped me stay at peace these last few years of my life. \n Morning rituals can range from a short meditation, a run in the park, taking some deep breaths, or simply being aware of your sorroundings. \n Share with us what your morning routines are like! \n Special days: \n Wednesdays: Food Talk Day \n Fridays: Pet Picture Share :) \n Hope you have fun here! Stay mindful, \n The Mindful Morning Community.",
      sprite: "jdenticon",
      seed: "498ad8du",
    },
    {
      owner_id: 8,
      name: "deep_blues",
      display_name: "Deep Blues",
      headline:
        "Blue is the color of deep oceans, deep reflection, peace, and sadness",
      description:
        "Deep Ocean Blue ~ Deep Sky Blue \n Deep Blues is a place where peaceful and sad posts can live together. Life is full of contradictions. \n Listening to some music that has got you really calm? :) \n Been feeling down in the deep blue oceans? :( \n Important Rules: \n - Respect a post's type of blues: don't try to mess with the author's vibes. \n - No harrassment! \n - No racism \n - No sexism \n Please be kind to one another.",
      sprite: "jdenticon",
      seed: "234dwd",
    },
    {
      owner_id: 2,
      name: "healing_giants",
      display_name: "Healings Giants",
      headline:
        "Healing Giants have magical powers of recovery from serious illness",
      description: "How are you recovering and healing?",
      sprite: "jdenticon",
      seed: "56jk45j",
    },
    {
      owner_id: 1,
      name: "cheers_family",
      display_name: "Cheers, Family!",
      headline:
        "We hold each other accountable to drinking responsibly or staying sober!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      sprite: "jdenticon",
      seed: "3543KKFd",
    },
  ]);
};
