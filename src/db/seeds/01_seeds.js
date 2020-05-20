const bcrypt = require('bcrypt')

/** Must be exec'd synhronously for it to work */
function makeHashedPass (plainTxtPassword) {
  const saltRounds = 7
  const hash = bcrypt.hashSync(plainTxtPassword, saltRounds)
  return hash
}

exports.seed = async function (knex) {
  await knex('users').del()

  const SEED_USER_PASSWORD = 'helloThereKid!77'

  // 9 users
  return knex('users').insert(
    [{
      username: 'seedUser1',
      email: 'seeduser1@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'seal125',
      email: 'wee@woo.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'pHarbo',
      email: 'pharbo@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'enmanuelD',
      email: 'enmanuel@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'devonteG',
      email: 'devG@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'anneDHya',
      email: 'anneD@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'cieloRey',
      email: 'cielo@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'flipzChoco',
      email: 'choco@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    },
    {
      username: 'true_color',
      email: 'colors@mail.com',
      password: makeHashedPass(SEED_USER_PASSWORD)
    }
    ])
}
