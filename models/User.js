const db = require('../db')

class User {
  static createUser (username, email, password) {
    const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)'
    return db.query(queryText, [username, email, password])
  }

  static getByEmail (email) {
    const queryText = 'SELECT * FROM users WHERE email = $1'
    return db.query(queryText, [email])
      .then((data) => data.rows[0])
  }

  static getById (userId) {
    const queryText = 'SELECT * FROM users WHERE id = $1'
    return db.query(queryText, [userId])
  }

  static getByUsername (username) {
    const queryText = 'SELECT * FROM users WHERE username = $1;'
    return db.query(queryText, [username])
      .then((data) => data.rows[0])
  }

  static getAllUsers () {
    return db.query('SELECT * FROM users;')
  }

  static deleteUser (userId) {
    const queryText = 'SELECT * FROM users WHERE id = $1;'
    return db.query(queryText, [userId])
  }

  static updatePassword (userId, newPassword) {
    const queryText = 'UPDATE users SET password = $1 WHERE id = $2'
    return db.query(queryText, [newPassword, userId])
  }

  static updateEmail (userId, newEmail) {
    const queryText = 'UPDATE users SET email = $1 WHERE id = $2'
    return db.query(queryText, [newEmail, userId])
  }

  static updateUsername (userId, newUsername) {
    const queryText = 'UPDATE users SET username = $1 WHERE id = $2'
    return db.query(queryText, [newUsername, userId])
  }
}

module.exports = User
