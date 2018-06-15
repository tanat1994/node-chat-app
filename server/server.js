const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'hellworold',
  //   createAt: 123
  // });
  //
  // socket.emit('sendEmit', {
  //   from: 'tanat@example.com',
  //   text: 'hi'
  // });

  // socket.emit('newMessage', {
  //   from: 'server',
  //   text: 'see you then',
  //   createdAt: 123123
  // });

  // socket.on('recvEmit', (newMessage) => {
  //   console.log('Recv Emit', newMessage);
  // });
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });
  //
  // socket.on('disconnect', () => {
  //   console.log('User was disconnected');
  // });


  // socket.emit from Admin text welcome to the chat Application
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat application',
  //   createdAt: new Date().getTime()
  // });

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createAt: new Date().getTime()
  // });

  socket.on('createLocationMessage', (coords) => {
    // console.log('createLocationMessage');
    // io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // @dev io.emit => broadcast
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This message is from the server');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`>Ready on port ${port}`);
});
