const { query } = require("../db");

class Communities {
  static getAll() {
    const queryText = "SELECT * FROM communities";
    return query(queryText).then((res) => res.rows);
  }

  static getById(id) {
    const queryText = "SELECT * FROM communities WHERE id = $1";
    return query(queryText, [id]).then((res) => res.rows[0]);
  }

  static getByUserId(userId) {
    const queryText =
      "SELECT communities.name, communities.id FROM communities INNER JOIN community_users ON (community_users.community_id = communities.id) INNER JOIN users ON (community_users.user_id = users.id)WHERE (users.id = $1);";
    return query(queryText, [userId]).then((res) => res.rows);
  }

  static create(
    userId,
    communityName,
    displayName,
    headline,
    description,
    sprite,
    seed
  ) {
    const queryText =
      "INSERT INTO communities (owner_id, name, display_name, headline, description, sprite, seed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
    return query(queryText, [
      userId,
      communityName,
      displayName,
      headline,
      description,
      sprite,
      seed,
    ]).then((res) => res.rows[0]);
  }

  // can take new display name, headline, description, and icon
  static update(communityId, displayName, headline, description, sprite, seed) {
    const queryText =
      "UPDATE communities SET display_name = $1, headline = $2, description = $3, sprite = $4, seed = $5 WHERE id = $6";
    return query(queryText, [
      displayName,
      headline,
      description,
      sprite,
      seed,
      communityId,
    ]);
  }

  static remove(communityId) {
    const queryText = "DELETE FROM communities WHERE community_id = $1";
    return query(queryText, [communityId]);
  }
}

module.exports = Communities;
