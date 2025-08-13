import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import type { ChatMessage } from "../App";

interface ChatPageProps {
  username: string;
  room: string;
  messages: ChatMessage[];
  message: string;
  setMessage: (v: string) => void;
  imageFile: File | null;
  setImageFile: (f: File | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onChangeRoom: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  username,
  room,
  messages,
  message,
  setMessage,
  handleImageChange,
  handleSubmit,
  onChangeRoom,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="flex flex-col w-full h-full bg-white rounded-none shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-12 py-6 border-b bg-indigo-50">
          <span className="font-bold text-2xl text-indigo-700">
            Room: {room}
          </span>
          <button
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
            onClick={onChangeRoom}
          >
            Change Room
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-12 py-6 bg-gray-50">
          {Array.isArray(messages) && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No messages yet. Start the conversation!
            </div>
          ) : (
            Array.isArray(messages) &&
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
            disabled
            readOnly
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

export default ChatPage;
