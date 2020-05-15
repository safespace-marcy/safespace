const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/postController')
const auth = require('../middleware/authenticate')

// API post controller paths
postRouter.post('/posts', auth, postController.create)
postRouter.delete('/posts/:id', auth, postController.deletePost)
postRouter.put('/posts/:id', auth, postController.update)
postRouter.get('/posts/:id', auth, postController.getById)
postRouter.get('/posts-user', auth, postController.getAllByUser)
postRouter.get('/posts-community/:id', auth, postController.getAllByCommunity)

module.exports = postRouter
