const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/message", function(req, res) {
  res.sendFile(__dirname + "/message.html")
});

io.on('connection', (socket) => {
  console.log('A user has connected');
  socket.on('disconnect', () => {
    console.log("user disconnected");
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log("message: " + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('name', (name) => {
    console.log('User: ' + name);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, function() {
  console.log("Server is running on port 3000");
});
