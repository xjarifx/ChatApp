import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
    <div className="w-screen h-screen bg-white flex flex-col">
      {/* Slack-style Header */}
      <div className="bg-[#4a154b] border-b border-[#3e1238] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-white">ChatApp</h1>
          <p className="text-[#b19cd9] text-sm">
            Choose a workspace to get started
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* User Setup */}
          <div className="bg-white rounded-lg border border-[#d1d2d3] shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#1d1c1d] mb-3">
              First, what should we call you?
            </h2>
            <div>
              <Label
                htmlFor="username"
                className="text-sm font-medium text-[#1d1c1d] mb-2 block"
              >
                Display name
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-3 py-3 text-base border border-[#d1d2d3] rounded-md focus:border-[#1264a3] focus:ring-2 focus:ring-[#1264a3]/20 focus:outline-none bg-white text-[#1d1c1d] placeholder-[#616061]"
                required
              />
            </div>
          </div>

          {/* Room Creation */}
          <div className="bg-white rounded-lg border border-[#d1d2d3] shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#1d1c1d] mb-3">
              Create or join a workspace
            </h2>
            <p className="text-[#616061] text-sm mb-4">
              Workspaces are shared environments where you can communicate with
              your team.
            </p>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="room"
                  className="text-sm font-medium text-[#1d1c1d] mb-2 block"
                >
                  Workspace name
                </Label>
                <Input
                  id="room"
                  type="text"
                  placeholder="e.g. marketing-team, project-alpha"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full h-11 px-3 py-3 text-base border border-[#d1d2d3] rounded-md focus:border-[#1264a3] focus:ring-2 focus:ring-[#1264a3]/20 focus:outline-none bg-white text-[#1d1c1d] placeholder-[#616061]"
                />
              </div>
              <Button
                className="w-full h-11 bg-[#4a154b] hover:bg-[#350d33] text-white font-semibold rounded-md transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!username || !room}
                onClick={() => handleJoinRoom(room)}
                type="button"
              >
                {room ? `Join "${room}"` : "Enter workspace name"}
              </Button>
            </div>
          </div>

          {/* Available Rooms */}
          {rooms.length > 0 && (
            <div className="bg-white rounded-lg border border-[#d1d2d3] shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#1d1c1d] mb-3">
                Available workspaces
              </h3>
              <p className="text-[#616061] text-sm mb-4">
                Join one of these existing workspaces:
              </p>

              <div className="space-y-2">
                {rooms.map((r) => (
                  <div
                    key={r}
                    className="flex items-center justify-between p-3 border border-[#d1d2d3] rounded-md hover:border-[#1264a3] hover:bg-[#f8f9fa] transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#4a154b] rounded-md flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {r.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#1d1c1d] font-medium">{r}</span>
                        <p className="text-[#616061] text-sm">
                          Active workspace
                        </p>
                      </div>
                    </div>
                    <Button
                      className="h-9 px-4 bg-[#007a5a] hover:bg-[#006644] text-white font-medium rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!username}
                      onClick={() => handleJoinRoom(r)}
                    >
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rooms.length === 0 && username && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-[#f8f9fa] border border-[#d1d2d3] rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-[#616061] text-xl">💬</span>
              </div>
              <p className="text-[#616061] text-sm">
                No workspaces available yet. Create one above to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
