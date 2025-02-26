import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();

// Enable CORS for API routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);

// Setup WebSocket Server on Port 8000
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // Store userId -> socketId mapping

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId) {
    console.error("User connected without a valid userId.");
    socket.disconnect(); // Prevent invalid connections
    return;
  }

  userSocketMap[userId] = socket.id;
  console.log(`✅ User connected: UserId = ${userId}, SocketId = ${socket.id}`);

  // Send updated online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log(`❌ User disconnected: UserId = ${userId}, SocketId = ${socket.id}`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
  });

  // Error handling
  socket.on("error", (err) => {
    console.error(`⚠️ Socket error: ${err.message}`);
  });
});

// Start server on PORT 8000
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`🚀 WebSocket Server running on port ${PORT}`));

export { app, server, io };
