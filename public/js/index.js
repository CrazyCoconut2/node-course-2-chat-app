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

  // socket.emit('createMessage', {
  //   from:'Frank',
  //   text: 'Hi!'
  // }, function(serverMessage) {
  //   console.log(serverMessage);
  // });

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from : 'User',
      text: jQuery('[name=message]').val()
    }, function(){

    });
  });