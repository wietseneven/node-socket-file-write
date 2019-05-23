const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const handleButtonPress = ({ message, filename }) => {
  fs.writeFile(`${__dirname}/output/${filename}`, message, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("button_press", handleButtonPress);
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
