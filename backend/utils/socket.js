import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const usersSocketId = new Map();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) usersSocketId.set(userId, socket.id);

  socket.on("sendMessage", data => {
    socket.broadcast.emit("recieveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    usersSocketId.delete(userId);
  });
});

export { app, server, io };
