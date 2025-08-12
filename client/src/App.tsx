import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { PaperClipIcon } from "@heroicons/react/24/outline";

const SOCKET_URL = "http://localhost:3000";
const ROOMS = ["general", "tech", "random"];

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { user: string; text?: string; image?: string }[]
  >([]);
  const [room, setRoom] = useState(ROOMS[0]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on(
      "messages",
      (msgs: { user: string; text?: string; image?: string }[]) => {
        setMessages(msgs);
      }
    );

    socketRef.current.on(
      "newMessage",
      (msg: { user: string; text?: string; image?: string }) => {
        setMessages((prev) => [...prev, msg]);
      }
    );

    socketRef.current.emit("joinRoom", room);

    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("joinRoom", room);
      setMessages([]);
    }
  }, [room]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Do NOT send the image here!
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || (!message && !imageFile)) return;

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result as string;
        socketRef.current?.emit("sendMessage", {
          room,
          user: username,
          text: message,
          image,
        });
        setMessage("");
        setImageFile(null);
      };
      reader.readAsDataURL(imageFile);
    } else {
      socketRef.current?.emit("sendMessage", {
        room,
        user: username,
        text: message,
      });
      setMessage("");
      setImageFile(null);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="flex flex-col w-full h-full bg-white rounded-none shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-12 py-6 border-b bg-indigo-50">
          <span className="font-bold text-2xl text-indigo-700">Chat Room</span>
          <select
            className="border rounded px-3 py-2 bg-white"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            {ROOMS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-y-auto px-12 py-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="mb-4">
                <span className="font-semibold text-indigo-600">
                  {msg.user}:{" "}
                </span>
                {msg.text && <span>{msg.text}</span>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="shared"
                    className="max-w-2xl max-h-80 mt-2 rounded shadow"
                  />
                )}
              </div>
            ))
          )}
        </div>
        <form
          className="flex gap-3 px-12 py-6 border-t bg-white"
          onSubmit={handleSubmit}
        >
          <input
            className="flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="flex-2 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label className="flex items-center cursor-pointer px-2 py-2 bg-indigo-100 rounded hover:bg-indigo-200 transition-colors">
            <PaperClipIcon className="h-6 w-6 text-indigo-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button
            className="px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
