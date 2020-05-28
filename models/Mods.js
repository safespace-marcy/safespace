const { query } = require("../db");

class Mods {
  static addToCommunity(userId, communityId) {
    const queryText = "INSERT INTO moderators (user_id, community_id)";
    return query(queryText, [userId, communityId]);
  }

  static getAllByCommunity(communityId) {
    const queryText =
      "SELECT * FROM moderators JOIN users ON moderators.user_id = users.id WHERE community_id = $1";
    return query(queryText, [communityId]).then((res) => res.rows);
  }

  static removeFromCommunity(userId, communityId) {
    const queryText =
      "DELETE FROM moderators WHERE user_id = $1 AND community_id = $2";
    return query(queryText, [userId, communityId]);
  }
}

module.exports = Mods;
