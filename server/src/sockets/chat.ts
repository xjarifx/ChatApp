import { Server, Socket } from "socket.io";
import { roomMessages } from "../store/roomMessages";
import { ChatMessage } from "../types/chat";

export function setupChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      if (!roomMessages[room]) {
        roomMessages[room] = [];
      }
      socket.emit("messages", roomMessages[room]);
      socket.emit("rooms", Object.keys(roomMessages));
    });

    socket.on(
      "sendMessage",
      (data: {
        room: string;
        user: string;
        text?: string;
        image?: string;
        video?: string;
        audio?: string;
        file?: { name: string; data: string; type: string };
      }) => {
        const { room, user, text, image, video, audio, file } = data;
        if (room && user && (text || image || video || audio || file)) {
          if (!roomMessages[room]) {
            roomMessages[room] = [];
          }
          const msg: ChatMessage = {
            user,
            ...(text && { text }),
            ...(image && { image }),
            ...(video && { video }),
            ...(audio && { audio }),
            ...(file && { file })
          };
          roomMessages[room].push(msg);
          io.to(room).emit("newMessage", msg);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
