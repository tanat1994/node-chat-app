const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'hellworold',
    createAt: 123
  });

  socket.emit('sendEmit', {
    from: 'tanat@example.com',
    text: 'hi'
  });

  // socket.emit('newMessage', {
  //   from: 'server',
  //   text: 'see you then',
  //   createdAt: 123123
  // });

  socket.on('recvEmit', (newMessage) => {
    console.log('Recv Emit', newMessage);
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // @dev io.emit => broadcast
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`>Ready on port ${port}`);
});
