const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

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
io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
});  

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log("Server is up on port " + port);
})



// //DIRNAME IS WITH DOUBLE UNDERSCORES
// console.log(__dirname + "/../public");
// /*We are gonna use a module for the paths */
// console.log(publicPath);
