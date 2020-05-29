const Comment = require("../models/Comments");

const create = (req, res) => {
  const { userId } = req;
  const { postId, content } = req.body;

  Comment.create(userId, postId, content)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res
        .status(500)
        .json({ error: "500 Internal Server Error", details: err });
    });
};

const deleteComment = (req, res) => {
  const { commentId } = req.params;

  Comment.delete(commentId)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { userId } = req;
  const { postId, content } = req.body;

  Comment.update(userId, postId, content)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.status(500).json({ error: "500 Internal Server Error" });
    });
};

const getAll = (req, res) => {
  const { id } = req.params;

  Comment.getAll(id)
    .then((data) => {
      return res.json(data.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  create,
  deleteComment,
  update,
  getAll,
};
