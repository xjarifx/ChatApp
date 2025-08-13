import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";

type Props = {
  username: string;
  setUsername: (name: string) => void;
  rooms: string[];
};

const RoomListPage: React.FC<Props> = ({ username, setUsername, rooms }) => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = (roomName: string) => {
    if (!username) return;
    navigate(`/room/${encodeURIComponent(roomName)}`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-xl p-0">
        <CardHeader className="border-b text-center">
          <h1 className="text-3xl font-bold">Select or Create a Room</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 mb-6">
            <div>
              <Label htmlFor="username">Your name</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="room">Create or join room by name</Label>
              <Input
                id="room"
                type="text"
                placeholder="Room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button
              variant="default"
              disabled={!username || !room}
              onClick={() => handleJoinRoom(room)}
              type="button"
            >
              Join Room
            </Button>
          </form>
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Rooms:</h2>
            <ul>
              {rooms.map((r) => (
                <li key={r} className="mb-2 flex justify-between items-center">
                  <span>{r}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!username}
                    onClick={() => handleJoinRoom(r)}
                  >
                    Join
                  </Button>
                </li>
              ))}
              {rooms.length === 0 && (
                <li className="text-gray-400">No rooms available yet.</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomListPage;
