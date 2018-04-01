const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();    // THIS IS THE PROPERS WAY TO USE EXPRESS
                        // WE DO NOT USE IT DIRECTLY ON EXPRESS

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log("Server is up on port " + port);
})



// //DIRNAME IS WITH DOUBLE UNDERSCORES
// console.log(__dirname + "/../public");
// /*We are gonna use a module for the paths */
// console.log(publicPath);
