const io = require("./server.js").io;

const onlineUsers = [];

module.exports = (socket) => {
  // Relays the socket id to the connected client
  socket.emit("your id", socket.id);
  // Saves connected user to an array
  socket.on("online", (userRef) => {
    for (let i = 0; i < onlineUsers.length; i += 1) {
      if (onlineUsers[i].userId === userRef.userId) {
        socket.broadcast.emit("update", onlineUsers);
        return "Already Online";
      }
    }
    onlineUsers.push(userRef);
    io.emit("update", onlineUsers);
  });
  // Sends the message to sender and specified reciever
  socket.on("send message", (body) => {
    io.to(socket.id).emit("message", body);
    if (!body.socketId) {
      socket.broadcast.emit("message", body);
    } else {
      io.to(body.socketId).emit("message", body);
    }
  });
  // Removes users from onlineUsers array upon going offline
  socket.on("go offline", () => {
    for (let i = 0; i < onlineUsers.length; i += 1) {
      if (onlineUsers[i].socketId === socket.id) {
        onlineUsers.splice(i, 1);
      }
    }
    io.emit("update", onlineUsers);
  });
  // Removes users from onlineUsers array upon disconnection from socket
  socket.on("disconnect", () => {
    for (let i = 0; i < onlineUsers.length; i += 1) {
      if (onlineUsers[i].socketId === socket.id) {
        onlineUsers.splice(i, 1);
      }
    }
    io.emit("update", onlineUsers);
  });
};
