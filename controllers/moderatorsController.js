const Mods = require("../models/Mods");

const getAllByCommunity = async (req, res) => {
  const { communityId } = req.params;
  try {
    const moderatorArr = await Mods.getAllByCommunity(communityId);
    res.status(200).json(moderatorArr);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const addToCommunity = async (req, res) => {
  const { communityId } = req.params;
  const modIds = req.body; // user ids
  try {
    // wrap each id in promise that resolves when added to db
    // const addPromiseArr = modIds.map(modId => {
    //   return new Promise((resolve, reject) => {
    //     Mods.addToCommunity(modId, communityId)
    //       .then(() => resolve())
    //       .catch(e => reject(e))
    //   })
    // })
    // const reducedPromise = await Promise.all(addPromiseArr)
    // console.log(reducedPromise)
    for (let i = 0; i < modIds.length; i++) {
      await Mods.addToCommunity(modIds[i], communityId);
    }

    res.sendStatus(201);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const removeFromCommunity = async (req, res) => {
  // one at a time is sensible for this
  const { communityId } = req.params;
  const { modId } = req.body;
  try {
    await Mods.removeFromCommunity(modId, communityId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = {
  getAllByCommunity,
  addToCommunity,
  removeFromCommunity,
};
