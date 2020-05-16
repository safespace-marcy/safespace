const { Pool } = require('pg')

// const pool = new Pool({
//   connectionString: process.env.DB_URL
// })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'safe_space',
  password: null,
  port: 5432
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  }
}
