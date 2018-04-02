  // This variable is critical to communicating
  var socket = io(); //method available to us because we locaded this library
        
  socket.on('connect', function() {
      console.log('Connected to server.');
      // we emit an email right after connecting
      // socket.emit('createMessage', {
      //   from:"David",
      //   text:"James."
      // });
      

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
  });
