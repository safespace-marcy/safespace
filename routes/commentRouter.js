const express = require("express");
const commentsRouter = express.Router();
const commentController = require("../controllers/commentsController");
const auth = require("../middleware/authenticate");

commentsRouter.post("/comments", auth, commentController.create);
commentsRouter.delete("/comments/:id", auth, commentController.deleteComment);
commentsRouter.put("/comments/:id", auth, commentController.update);
commentsRouter.get("/comments/:id", auth, commentController.getAll);

module.exports = commentsRouter;
