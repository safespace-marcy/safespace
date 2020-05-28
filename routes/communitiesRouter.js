const express = require("express");
const communityRouter = express.Router();
const commController = require("../controllers/communitiesController");
const auth = require("../middleware/authenticate");

communityRouter.get("/communities", commController.getAll);

communityRouter.get("/communities/:communityId", commController.getById);

communityRouter.get("/communitiesByUser/:userId", commController.getByUserId);

communityRouter.post("/communities", auth, commController.createCommunity);

communityRouter.put(
  "/communities/:communityId",
  auth,
  commController.updateCommunity
);

communityRouter.delete(
  "/communities/:communityId",
  auth,
  commController.deleteCommunity
);

module.exports = communityRouter;
