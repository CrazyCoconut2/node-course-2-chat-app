  // This variable is critical to communicating
  var socket = io(); //method available to us because we locaded this library
        
  socket.on('connect', function() {
      console.log('Connected to server.');
      // we emit an email right after connecting
     
      

      // socket.emit('createEmail', {
      //     to:"billyBob@gmail.com",
      //     text:"Hi billy."
      // });
      
  });

  socket.on('disconnect', function() {
      console.log('Disconnected from server.');
  });

  // socket.on('newEmail',  function(email) {
  //   console.log("New email! ");
  //   console.log(email);
  // });

  socket.on('newMessage', function(message) {
    console.log(message);
    var li = jQuery('<li></li');
    li.text(message.from + ":" + message.text);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a = target="_blank">My current location</a>');

    li.text(message.from);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);    
  });
  // socket.emit('createMessage', {
  //   from:'Frank',
  //   text: 'Hi!'
  // }, function(serverMessage) {
  //   console.log(serverMessage);
  // });
  let messageTextbox = jQuery('[name=message]');

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from : 'User',
      text: messageTextbox.val()
    }, function(){
      messageTextbox.val('');
    });
  });

  let locationButton = jQuery('#send-location');
  locationButton.on('click', function() {
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition(function(position) {
      //console.log(position);
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude : position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function() {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    })
  });