const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

var messages = [];
var users = [];

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("messages", message);
    messages.push(message);
  })
  socket.on("username", (name) => {
    socket.broadcast.emit("newuser", name);
    users.push(name);
  })
});

httpServer.listen(3001);