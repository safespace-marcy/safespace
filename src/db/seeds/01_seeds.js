const bcrypt = require("bcrypt");

/** Must be exec'd synhronously for it to work */
function makeHashedPass(plainTxtPassword) {
  const saltRounds = 7;
  const hash = bcrypt.hashSync(plainTxtPassword, saltRounds);
  return hash;
}

exports.seed = async function (knex) {
  await knex("users").del();

  const SEED_USER_PASSWORD = "helloThereKid!77";

  // 9 users
  return knex("users").insert([
    {
      username: "hdaytona",
      email: "holly@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "female",
      seed: "134567dzm,lc",
    },
    {
      username: "seal125",
      email: "wee@woo.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "female",
      seed: "seal1scool",
    },
    {
      username: "enmanuelD",
      email: "enmanuel@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "human",
      seed: "F8dj5",
    },
    {
      username: "devonte202",
      email: "devg@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "male",
      seed: "devonte",
    },
    {
      username: "koolkat",
      email: "mdln@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "female",
      seed: "wdwa",
    },
    {
      username: "cieloRey",
      email: "cielo@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "human",
      seed: "F8dj2",
    },
    {
      username: "cindyxz",
      email: "cindia@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "female",
      seed: "wdaki",
    },
    {
      username: "sword_nick",
      email: "nick@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "male",
      seed: "fif8eh3fd",
    },
    {
      username: "paulyy",
      email: "paul@mail.com",
      password: makeHashedPass(SEED_USER_PASSWORD),
      sprite: "male",
      seed: "rawxges3466hbdhla;p[042195kfksufnm,xcu4093jnvksudme,kow3jri2i",
    },
  ]);
};
