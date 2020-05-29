const db = require("../db");

class Post {
  static create(userId, communityId, content, title) {
    const queryText =
      "INSERT INTO posts (user_id, community_id, content, title) VALUES ($1, $2, $3, $4);";
    return db.query(queryText, [userId, communityId, content, title]);
  }

  static delete(postId) {
    const queryText = "DELETE FROM posts WHERE id = $1;";
    return db.query(queryText, [postId]);
  }

  static update(content, postId, title) {
    const queryText =
      "UPDATE posts SET content = $1, title = $3 WHERE id = $2;";
    return db.query(queryText, [content, postId, title]);
  }

  static getById(postId) {
    const queryText = "SELECT * FROM posts WHERE id = $1;";
    return db.query(queryText, [postId]).then((response) => response.rows[0]);
  }

  static getAllByUser(userId) {
    const queryText =
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC;";
    return db.query(queryText, [userId]).then((response) => response.rows);
  }

  static getAllByCommunity(communityId) {
    const queryText =
      "SELECT * FROM posts WHERE community_id = $1 ORDER BY id DESC;";
    return db.query(queryText, [communityId]).then((response) => response.rows);
  }

  static getSomeByCommunity(communityId) {
    const queryText =
      "SELECT * FROM posts WHERE community_id = $1 LIMIT 2;";
    return db.query(queryText, [communityId]).then((response) => response.rows);
  }
}
module.exports = Post;
