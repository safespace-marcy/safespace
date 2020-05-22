const { query } = require('../db')

class Communities {
  static getAll () {
    const queryText = 'SELECT * FROM communities'
    return query(queryText).then(res => res.rows)
  }

  static getById (id) {
    const queryText = 'SELECT * FROM communities WHERE id = $1'
    return query(queryText, [id]).then(res => res.rows[0])
  }

  static getByUserId (userId) {
    const queryText = 'SELECT communities.name, communities.id FROM communities INNER JOIN community_users ON (community_users.community_id = communities.id) INNER JOIN users ON (community_users.user_id = users.id)WHERE (users.id = $1);'
    return query(queryText, [userId]).then(res => res.rows)
  }
}

module.exports = Communities
