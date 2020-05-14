const { query } = require('../db')

class Communities {
  static getAll () {
    const queryText = 'SELECT * FROM communities'
    return query(queryText).then(res => res.rows)
  }

  static getById (id) {
    const queryText = 'SELECT * FROM communities WHERE id = $1'
    return query(queryText, [id]).then(res => res.row[0])
  }
}

module.exports = Communities
