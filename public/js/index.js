var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  // socket.emit('createEmail', {
  //   to: 'ku@example.com',
  //   text: 'hello'
  // });
  //
  // socket.emit('recvEmit', {
  //   to: 'idiot@example.com',
  //   text: 'hi guys'
  // });
  //
  // socket.emit('createMessage', {
  //   from: 'tanat@email.com',
  //   text: 'working'
  // });
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'tanatcreate',
  text: 'helloCreateMessage'
}, function (data) {
  console.log('Got it ', data)
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log(data);
  });
});
// socket.on('disconnect', function () {
//   console.log('Disconnected from server');
// });
//
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
//
// socket.on('sendEmit', function (message) {
//   console.log('New Message', message);
// });
