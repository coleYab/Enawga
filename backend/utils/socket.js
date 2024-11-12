import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

const getSocketIdFromUserId = (userId) => {
  return usersSocketId.get(userId);
}

export { app, server, io, getSocketIdFromUserId };
