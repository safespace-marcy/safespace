const Post = require('../models/Post');

const create = (req, res) => {
  const { content } = req.body;
  const { communityId, userId } = req.params;

  Post.create(userId, communityId, content)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.delete(id)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  Post.update(content, id)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  Post.getById(id)
    .then((data) => res.json(data.rows[0]))
    .catch((err) => res.send(err));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  Post.getAllByUser(userId)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getCommunity = (req, res) => {
  const { communityId } = req.params;
  
  Post.getAllByCommunity(communityId)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  create,
  deletePost,
  update,
  getById,
  getUser,
  getCommunity,
};
