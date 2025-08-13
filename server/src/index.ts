import express from "express";
import http from "http";
import { Server } from "socket.io";
import roomsRouter from "./routes/rooms";
import { setupChatSocket } from "./sockets/chat";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(roomsRouter);

setupChatSocket(io);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
