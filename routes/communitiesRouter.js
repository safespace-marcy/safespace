const express = require('express')
const router = express.Router()
const commController = require('../controllers/communitiesController')
/** Purposefully not authenticated, unnecessary I think */

router.get('/communities', commController.getAll)
router.get('/communities/:communityId', commController.getById)

module.exports = router
