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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'tanatcreate',
//   text: 'helloCreateMessage'
// }, function (data) {
//   console.log('Got it ', data)
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (data) {
    // console.log(data);
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
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
