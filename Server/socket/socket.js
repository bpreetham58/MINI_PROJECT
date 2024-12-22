import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // Map to store socket ID corresponding to user ID

io.on("connection", (socket) => {
  // Extract user ID from query parameters
  const userId = socket.handshake.query.userId;

  // Check if userId is valid
  if (userId) {
    userSocketMap[userId] = socket.id; // Map user ID to socket ID
    console.log(`User connected: UserId = ${userId}, SocketId = ${socket.id}`);
  } else {
    console.error("User connected without a valid userId.");
    return;
  }

  // Emit online users list to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId]; // Remove user from map
      console.log(`User disconnected: UserId = ${userId}, SocketId = ${socket.id}`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
  });
});

// Export app, server, and io
export { app, server, io };
