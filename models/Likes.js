const db = require('../db')

class Likes {
  static addALike (postId) {
      'UPDATE posts SET likes=likes + 1 WHERE id=$1;'
      return db.query(queryText, [content, postId])
    }
  
  static deleteALike (postId) {
    'UPDATE posts SET likes=likes - 1 WHERE id=$1;'
    return db.query(queryText, [content, postId])
  }
}
module.exports = Likes