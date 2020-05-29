const express = require("express");
const router = express.Router();
const modsController = require("../controllers/moderatorsController");
const auth = require("../middleware/authenticate");

/** Get all the moderators of a community */
router.get("/moderators/:communityId", auth, modsController.getAllByCommunity);

/** Add moderator(s) to a community */
router.post("/moderators/:communityId", auth, modsController.addToCommunity);

/** Remove moderator(s) from a community */
router.delete(
  "/moderators/:communityId",
  auth,
  modsController.removeFromCommunity
);

module.exports = router;
