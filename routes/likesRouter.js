const express = require("express");
const likesRouter = express.Router();
const likesController = require("../controllers/likesController");

likesRouter.get("/likes/:id", likesController.AllLikesForPost);
likesRouter.post("/like/:post_id/:user_id", likesController.AddALike);
likesRouter.post("/unlike/:post_id/:user_id", likesController.DeleteALike);

module.exports = likesRouter;
