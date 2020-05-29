// Express server dependencies required
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);

// Extra dependencies required to parse bodies and cookies
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Socket.io requires and manager setup
const io = (module.exports.io = require("socket.io")(http));
const socketManager = require("./socketManager");
io.on("connection", socketManager);

// API Routers required here
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const communityRouter = require("./routes/communitiesRouter");
const commUserRouter = require("./routes/communityUserRouter");
const likesRouter = require("./routes/likesRouter");
const commentsRouter = require("./routes/commentRouter");
const modsRouter = require("./routes/moderatorsRouter");
// port is specified in environment variable or default to 8080
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Specifies path to React build to be served
app.use(express.static(path.join(__dirname, "client/build")));

// Adds routers as abstraction middleware
app.use(userRouter);
app.use(postRouter);
app.use(communityRouter);
app.use(commUserRouter);
app.use(likesRouter);
app.use(commentsRouter);
app.use(modsRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Server is active on specified port
http.listen(port, () => console.log(`App listening on port ${port}`));
