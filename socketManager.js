const io = require('./server.js').io

module.exports = (socket) => {
  // Relays the socket id to the connected client
  socket.emit('your id', socket.id)
  // Sends the message to all connected users
  socket.on('send message', (body) => {
    io.emit('message', body)
  })
}
