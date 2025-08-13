import React from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
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
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-3xl h-full flex flex-col p-0">
        <CardHeader className="border-b flex justify-between items-center">
          <span className="font-bold text-2xl">Room: {room}</span>
          <Button variant="outline" onClick={onChangeRoom}>
            Change Room
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-12 py-6">
          {Array.isArray(messages) && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            Array.isArray(messages) &&
            messages.map((msg, idx) => (
              <div key={idx} className="mb-4">
                <span className="font-semibold">{msg.user}: </span>
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
        </CardContent>
        <form
          className="grid w-full gap-4 px-6 py-4 border-t md:grid-cols-[180px_1fr_auto_auto] items-end"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <Label htmlFor="username" className="text-sm font-medium">
              Your name
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              disabled
              readOnly
              className="mt-1 h-9"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="message" className="text-sm font-medium">
              Type a message...
            </Label>
            <Input
              id="message"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 h-9"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Label htmlFor="file" className="sr-only">
              Attach image
            </Label>
            <Button asChild variant="outline" size="icon" className="h-9 w-9">
              <label
                htmlFor="file"
                className="flex items-center justify-center cursor-pointer"
              >
                <PaperClipIcon className="h-5 w-5" />
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </Button>
          </div>
          <Button type="submit" className="h-9 px-4">
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatPage;
