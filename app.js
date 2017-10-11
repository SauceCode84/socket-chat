const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("Client connected...");

  socket.on("join", data => {
    console.log(data);
  });

  socket.on("messages", data => {
    console.log("messages", data);
    socket.emit("sendMessage", data);
    socket.broadcast.emit("sendMessage", data);
  });
});

server.listen(4200, () => {
  console.log("Listening on port 4200...");
});