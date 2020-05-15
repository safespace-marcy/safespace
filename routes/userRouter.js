const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')

// API user controller paths
userRouter.get('/login', userController.login)
userRouter.post('/user', userController.register)
userRouter.get('/logout', userController.logout)
userRouter.delete('/user', authenticate, userController.deleteAccount)
userRouter.get('/user', authenticate, userController.getUser)

module.exports = userRouter
