const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')

//API user controller paths
userRouter.get('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.get('/logout', userController.logout)
userRouter.delete('/delete-account', authenticate, userController.deleteAccount)
userRouter.get('/get-user', authenticate, userController.getUser)

module.exports = userRouter
