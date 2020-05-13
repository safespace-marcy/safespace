const Post = require('../models/post');

const add = (req, res) => {
  const { userId,communityId,content,date,hour } = req.body
  Post.create(userId,communityId,content,date,hour)
}

const deletePost = (req, res) => {
  const { id } = req.params
  Post.delete(postId)
}

const update = (req, res) => {
  const { content } = req.body
  const { id } = req.params
  postId.update(content,postId)
}

const read = (req, res) => {
  const { id } = req.params
  Post.read(id)
}

const getAllByUser = (req, res) => {
  const { id } = req.params
  Post.getAllByUser(id)
}

const getAllByCommunity = (req, res) => {
  const { communityId } = req.params
  Post.getAllByCommunity(communityId)
}