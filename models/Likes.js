const db = require("../db");

class Likes {
  static addALike(userId, postId) {
    const queryText = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2);";
    return db.query(queryText, [userId, postId]);
  }

  static deleteALike(userId, postId) {
    const queryText = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2;";
    return db.query(queryText, [userId, postId]);
  }

  static amountOfLike(postId) {
    const queryText = "SELECT * FROM likes WHERE post_id=$1;";
    return db.query(queryText, [postId]).then((response) => response.rows);
  }
}
module.exports = Likes;
