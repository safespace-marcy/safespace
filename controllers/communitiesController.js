const Communities = require("../models/Communities");

/** Responds with array of all communities */
const getAll = async (req, res) => {
  try {
    const communities = await Communities.getAll();
    res.status(200).send(JSON.stringify(communities));
  } catch (e) {
    res.send(500).json({ error: e });
  }
};

/** Responds with single community object */
const getById = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Communities.getById(communityId);
    res.status(200).json(community);
  } catch (e) {
    res.send(500).json({ error: e });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const community = await Communities.getByUserId(userId);
    res.status(200).json(community);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

/** Creates a new community */
const createCommunity = async (req, res) => {
  const { userId } = req;
  const {
    communityName,
    displayName,
    headline,
    description,
    sprite,
    seed,
  } = req.body;
  console.log(communityName, displayName, headline, description, sprite, seed);
  try {
    const addedCommunity = await Communities.create(
      userId,
      communityName,
      displayName,
      headline,
      description,
      sprite,
      seed
    );
    console.log(addedCommunity);
    res.status(200).json(addedCommunity);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateCommunity = async (req, res) => {};

const deleteCommunity = async (req, res) => {};

module.exports = {
  getAll,
  getById,
  getByUserId,
  createCommunity,
  updateCommunity,
  deleteCommunity,
};
