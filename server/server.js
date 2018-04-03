const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage,generateLocationMessage} = require('./utils/message.js');

// heroku app :  https://pumpkin-custard-64046.herokuapp.com/
// heroku git : https://git.heroku.com/pumpkin-custard-64046.git

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();    // THIS IS THE PROPERS WAY TO USE EXPRESS
                        // WE DO NOT USE IT DIRECTLY ON EXPRESS
var server = http.createServer(app);
// Next thing we do is to also configure the server to use
// socket.io
var io=socketIO(server); // we pass in parameters the server we wanna use

//Emitting and communicating events

// built in events
io.on('connection', (socket) =>{
    console.log('New user connected.');
    // socket.emit("newEmail", {
    //     from: 'Mike@gmail.com',
    //     text: "hello"
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat.'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user connected!'))
    //Socket.emit emits an event to a single connection
    // io.emit emits a message to every connection
    // Socket.broadcast will send the message to everybody
    // except the specific socket that uses broadcast

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        // io.emit eemits the message to everybody
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
        // BROADCASTING
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });

   
});  

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log("Server is up on port " + port);
})



// //DIRNAME IS WITH DOUBLE UNDERSCORES
// console.log(__dirname + "/../public");
// /*We are gonna use a module for the paths */
// console.log(publicPath);
