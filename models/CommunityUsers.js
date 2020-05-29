const { query } = require("../db");

class CommunityUsers {
  static getAllFromCommunity(communityId) {
    const queryText = "SELECT * FROM community_users WHERE community_id = $1";
    return query(queryText, [communityId]).then((res) => res.rows);
  }

  // adds user to a community
  static join(userId, communityId) {
    console.log(userId, communityId);
    const queryText =
      "INSERT INTO community_users (user_id, community_id) VALUES ($1, $2)";
    return query(queryText, [userId, communityId]);
  }

  // remove user from a specific community
  static leave(userId, communityId) {
    const queryText =
      "DELETE * FROM community_users WHERE user_id = $1 AND community_id = $2";
    return query(queryText, [userId, communityId]);
  }
}

module.exports = CommunityUsers;
