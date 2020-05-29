const Post = require("../models/Posts");

const create = (req, res) => {
  const { userId } = req;
  const { body, communityId, title } = req.body;

  Post.create(userId, communityId, body, title)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.status(500).json({ error: "500 Internal Server Error" });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.delete(id)
    .then((data) => res.status(200))
    .catch((err) => {
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { title, body, postId } = req.body;

  Post.update(body, postId, title)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.status(500).json({ error: "500 Internal Server Error" });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  Post.getById(id)
    .then((post) => res.json(post))
    .catch((err) => res.send(err));
};

const getAllByUser = (req, res) => {
  const { id } = req.params;

  Post.getAllByUser(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getAllByCommunity = (req, res) => {
  const { id } = req.params;

  Post.getAllByCommunity(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getSomeByCommunity = (req, res) => {
  const { id } = req.params;

  Post.getSomeByCommunity(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  create,
  deletePost,
  update,
  getById,
  getAllByUser,
  getAllByCommunity,
  getSomeByCommunity,
};
