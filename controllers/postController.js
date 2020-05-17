const Post = require('../models/Posts')

const create = (req, res) => {
  const { userId } = req
  const { content, communityId, title } = req.body

  Post.create(userId, communityId, content, title)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: '500 Internal Server Error' })
    })
}

const deletePost = (req, res) => {
  const { id } = req.params

  Post.delete(id)
    .then(data => res.json(data.rows))
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}

const update = (req, res) => {
  const { id } = req.params
  const { content } = req.body

  Post.update(content, id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: '500 Internal Server Error' })
    })
}

const getById = (req, res) => {
  const { id } = req.params

  Post.getById(id)
    .then(post => res.json(post))
    .catch(err => res.send(err))
}

const getAllByUser = (req, res) => {
  const { userId } = req
  console.log(userId)

  Post.getAllByUser(userId)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: '500 Internal Server Error' })
    })
}

const getAllByCommunity = (req, res) => {
  const { id } = req.params

  Post.getAllByCommunity(id)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}

module.exports = {
  create,
  deletePost,
  update,
  getById,
  getAllByUser,
  getAllByCommunity
}
