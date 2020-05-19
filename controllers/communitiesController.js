const Communities = require('../models/Communities')

/** Responds with array of all communities */
const getAll = async (req, res) => {
  try {
    const communities = await Communities.getAll()
    res.status(200).send(JSON.stringify(communities))
  } catch (e) {
    res.send(500).json({ error: e })
  }
}

/** Responds with single community object */
const getById = async (req, res) => {
  try {
    const { communityId } = req.params
    const community = await Communities.getById(communityId)
    res.status(200).json(community)
  } catch (e) {
    res.send(500).json({ error: e })
  }
}

module.exports = {
  getAll,
  getById
}
