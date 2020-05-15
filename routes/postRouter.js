const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/postController')
const authenticate = require('../middleware/authenticate')

//API post controller paths
postRouter.post('/add-post', authenticate, postController.add)
postRouter.delete('/delete-post:id', postController.deletePost)
postRouter.put('/update-post:id', postController.update)
postRouter.get('/read-post:id', authenticate, postController.read)
postRouter.get('/getBy-user:id', authenticate, postController.getAllByUser)
postRouter.get('/getBy-community:id', authenticate, postController.getAllByCommunity)

module.exports = userRouter
