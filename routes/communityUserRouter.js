const express = require("express");
const commUserRouter = express.Router();
const commUserController = require("../controllers/communityUserController");
const auth = require("../middleware/authenticate");

commUserRouter.get("/join/:id", auth, commUserController.getAll);
commUserRouter.post("/join", auth, commUserController.join);
commUserRouter.delete("/join/:id", auth, commUserController.leave);

module.exports = commUserRouter;
