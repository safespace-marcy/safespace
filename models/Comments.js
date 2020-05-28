const db = require("../db");

class Comments {
  static create(userId, postId, content) {
    const queryText =
      "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3);";
    return db.query(queryText, [userId, postId, content]);
  }

  static delete(commentId) {
    const queryText = "DELETE FROM comments WHERE id = $1;";
    return db.query(queryText, [commentId]);
  }

  static update(content, commentId) {
    const queryText = "UPDATE comments SET content = $1 WHERE id = $2";
    return db.query(queryText, [content, commentId]);
  }

  static getAll(postId) {
    const queryText = "SELECT * FROM comments WHERE post_id = $1";
    return db.query(queryText, [postId]);
  }
}

module.exports = Comments;
