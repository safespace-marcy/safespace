const Post = require('../models/Post');

const deletePost = (req, res) => {
  const { postId } = req.params;

  Post.delete(postId)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const createPost = (req, res) => {
  const { content } = req.body;
  const { communityId, userId } = req.params;

  Post.create(communityId, userId, content)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getCommunityPosts = (req, res) => {
  const { communityId } = req.params;
  
  Post.getCommunityPosts(communityId)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const viewUsersPosts = (req, res) => {
  const { userId } = req.params;

  Post.getUsersPosts(userId)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};


const updatePost = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  Post.updatePost(id, content)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  Post.getPostById(id)
    .then((data) => res.json(data.rows[0]))
    .catch((err) => res.send(err));
};

module.exports = {
  createPost,
  getCommunityPosts,
  deletePost,
  updatePost,
  viewUsersPosts,
  getPostById,
};
