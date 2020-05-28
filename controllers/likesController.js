const Likes = require("../models/Likes");

const AllLikesForPost = async (req, res) => {
  const { id } = req.params;
  const data = await Likes.amountOfLike(id);
  return res.status(200).json(data);
};
const AddALike = async (req, res) => {
  const { user_id, post_id } = req.params;
  const data = await Likes.addALike(user_id, post_id);
  return res.status(200).json(data);
};
const DeleteALike = async (req, res) => {
  const { user_id, post_id } = req.params;
  const data = await Likes.deleteALike(user_id, post_id);
  return res.status(200).json(data);
};

module.exports = {
  AllLikesForPost,
  AddALike,
  DeleteALike,
};
