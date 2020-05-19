const express = require('express')
const communityRouter = express.Router()
const commController = require('../controllers/communitiesController')
/** Purposefully not authenticated, unnecessary I think */

communityRouter.get('/communities', commController.getAll)
communityRouter.get('/communities/:communityId', commController.getById)

module.exports = communityRouter
