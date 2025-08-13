import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import io, { Socket } from "socket.io-client";
import RoomListPage from "./pages/RoomListPage";
import ChatPage from "./pages/ChatPage";

const SOCKET_URL = "http://localhost:3000";

export interface ChatMessage {
  user: string;
  text?: string;
  image?: string;
}

// Chat component that handles the room-specific logic
const ChatRoom: React.FC<{
  username: string;
  socketRef: React.RefObject<Socket | null>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  username,
  socketRef,
  messages,
  setMessages,
  message,
  setMessage,
  imageFile,
  setImageFile,
  handleImageChange,
}) => {
  const { roomName } = useParams<{ roomName: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomName && socketRef.current) {
      socketRef.current.emit("joinRoom", roomName);
      setMessages([]);
    }
  }, [roomName, socketRef, setMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || (!message && !imageFile) || !roomName) return;
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result as string;
        socketRef.current?.emit("sendMessage", {
          room: roomName,
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
        room: roomName,
        user: username,
        text: message,
      });
      setMessage("");
      setImageFile(null);
    }
  };

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return (
    <ChatPage
      username={username}
      room={roomName || ""}
      messages={messages}
      message={message}
      setMessage={setMessage}
      imageFile={imageFile}
      setImageFile={setImageFile}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      onChangeRoom={() => navigate("/")}
    />
  );
};

// Main App component
const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on("messages", (msgs: unknown) =>
      setMessages(Array.isArray(msgs) ? (msgs as ChatMessage[]) : [])
    );
    socketRef.current.on("newMessage", (msg: ChatMessage) =>
      setMessages((prev) => [...prev, msg])
    );
    socketRef.current.on("rooms", (list: string[]) => setRooms(list));
    return () => socketRef.current?.disconnect();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RoomListPage
              username={username}
              setUsername={setUsername}
              rooms={rooms}
            />
          }
        />
        <Route
          path="/room/:roomName"
          element={
            <ChatRoom
              username={username}
              socketRef={socketRef}
              messages={messages}
              setMessages={setMessages}
              message={message}
              setMessage={setMessage}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleImageChange={handleImageChange}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
