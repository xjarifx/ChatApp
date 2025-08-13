import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
    <div className="w-screen h-screen flex flex-col bg-white">
      {/* Slack-style Header */}
      <div className="bg-white border-b border-[#d1d2d3] px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#4a154b] rounded mr-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">#</span>
            </div>
            <h1 className="text-lg font-bold text-[#1d1c1d]">{room}</h1>
          </div>
        </div>
        <Button
          className="h-8 px-3 bg-[#007a5a] hover:bg-[#006644] text-white font-medium rounded text-sm"
          onClick={onChangeRoom}
        >
          Leave workspace
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
        {Array.isArray(messages) && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-[#f8f9fa] border border-[#d1d2d3] rounded-lg flex items-center justify-center mb-4">
              <span className="text-[#616061] text-xl">#</span>
            </div>
            <h2 className="text-xl font-bold text-[#1d1c1d] mb-2">
              This is the beginning of #{room}
            </h2>
            <p className="text-[#616061] text-sm max-w-md">
              This workspace was created just now. You're looking at the very
              first message.
            </p>
          </div>
        ) : (
          <div className="max-w-none">
            {Array.isArray(messages) &&
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="flex items-start mb-4 hover:bg-[#f8f9fa] px-4 py-2 rounded-md transition-colors"
                >
                  {/* User Avatar */}
                  <div className="w-9 h-9 bg-[#4a154b] rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">
                      {msg.user.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline mb-1">
                      <span className="font-bold text-[#1d1c1d] text-sm mr-2">
                        {msg.user}
                      </span>
                      <span className="text-xs text-[#616061]">now</span>
                    </div>

                    {msg.text && (
                      <p className="text-[#1d1c1d] text-sm leading-5 break-words">
                        {msg.text}
                      </p>
                    )}

                    {msg.image && (
                      <div className="mt-2">
                        <img
                          src={msg.image}
                          alt="shared"
                          className="max-w-md max-h-80 rounded-lg border border-[#d1d2d3] shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div className="border-t border-[#d1d2d3] bg-white px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* User indicator */}
          <div className="flex items-center text-xs text-[#616061]">
            <span>Messaging as: </span>
            <span className="ml-1 font-medium text-[#1d1c1d]">{username}</span>
          </div>

          {/* Input container */}
          <div className="relative">
            <div className="border border-[#d1d2d3] rounded-lg bg-white focus-within:border-[#1264a3] focus-within:ring-2 focus-within:ring-[#1264a3]/20 transition-colors">
              <Input
                type="text"
                placeholder={`Message #${room}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-0 focus:ring-0 focus:border-0 h-12 px-4 text-base bg-transparent text-[#1d1c1d] placeholder-[#616061] resize-none"
              />

              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center space-x-2">
                  {/* Attachment button */}
                  <Button
                    type="button"
                    className="h-8 w-8 p-0 bg-transparent hover:bg-[#f8f9fa] text-[#616061] hover:text-[#1d1c1d] border-0 shadow-none"
                    asChild
                  >
                    <label className="flex items-center justify-center cursor-pointer">
                      <PaperClipIcon className="h-5 w-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </Button>
                </div>

                {/* Send button */}
                <Button
                  type="submit"
                  disabled={!message.trim()}
                  className="h-8 px-4 bg-[#007a5a] hover:bg-[#006644] text-white font-medium rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#007a5a]"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
