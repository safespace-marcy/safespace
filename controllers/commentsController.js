const Comment = require('../models/Comments')

const create = (req,res) => {
  const { userId } = req
  const { postId, content } = req.body

  Comment.create(userId, postId, content)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: '500 Internal Server Error' })
    })
}

const deleteComment = (req, res) => {
  const { commentId } = req.params

  Post.delete(commentId)
    .then(data => res.json(data.rows))
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}