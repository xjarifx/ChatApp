import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

type ChatMessage = { user: string; text?: string; image?: string };
const roomMessages: Record<string, ChatMessage[]> = {};

app.get("/rooms", (req, res) => {
  res.json({})
})

app.get("/rooms/:room/messages", (req, res) => {
  const room = req.params.room;
  res.json(roomMessages[room] || []);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room: string) => {
    socket.join(room);
    socket.emit("messages", roomMessages[room] || []);
  });

  socket.on(
    "sendMessage",
    (data: { room: string; user: string; text?: string; image?: string }) => {
      const { room, user, text, image } = data;
      if (room && user && (text || image)) {
        if (!roomMessages[room]) {
          roomMessages[room] = [];
        }
        roomMessages[room].push({ user, text, image });
        io.to(room).emit("newMessage", { user, text, image });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
