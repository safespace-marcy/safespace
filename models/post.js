const db = require('../db');

class Post{
  static create(userId,communityId,content,date,hour){
    const queryText = 'INSERT INTO posts (user_id, community_id, content, time_made) VALUES ($1, $2, $3, $4);'
    return db.query(queryText,[userId,communityId,content,(date,hour)])
  }

  static delete(postId){
    const queryText = 'DELETE FROM posts WHERE id = $1;';
    return db.query(queryText, [postId]);
  }

  static update(content,postId){
    const queryText = 'UPDATE posts SET content = $1 WHERE id = $2'
    return db.query(queryText, [content,postId])
  }

  static read(postId){
    const queryText = 'SELECT * FROM posts WHERE id = $1;';
    return db.query(queryText, [postId])
      .then((response) => response.rows);
  }

  static getAllByUser(userId){
    const queryText = 'SELECT * FROM posts WHERE user_id = $1;';
    return db.query(queryText, [userId])
      .then((response) => response.rows);
  }

  static getAllByCommunity(communityId){
    const queryText = 'SELECT * FROM posts WHERE COMMUNITY_id = $1;';
    return db.query(queryText, [communityId])
      .then((response) => response.rows);
  }
}
module.exports = Post