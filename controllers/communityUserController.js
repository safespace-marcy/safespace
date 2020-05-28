const Communities = require("../models/CommunityUsers");

/** Responds with array of all communities */
const getAll = async (req, res) => {
  try {
    const users = await Communities.getAllFromCommunity(communityId);
    res.status(200).send(JSON.stringify(users));
  } catch (e) {
    res.send(500).json({ error: e });
  }
};

/** Responds with single community object */
const join = async (req, res) => {
  const { userId, communityId } = req.body;
  Communities.join(userId, communityId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "500 Internal Server Error" });
    });
};

const leave = async (req, res) => {
  Communities.leave(userId, communityId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "500 Internal Server Error" });
    });
};

module.exports = {
  getAll,
  join,
  leave,
};
