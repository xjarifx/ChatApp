import React, { useState } from "react";
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
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="flex flex-col w-full max-w-xl bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Select or Create a Room
        </h1>
        <input
          className="mb-4 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="mb-4 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="text"
          placeholder="Create or join room by name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className="mb-6 px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          disabled={!username || !room}
          onClick={() => handleJoinRoom(room)}
        >
          Join Room
        </button>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-indigo-600">
            Available Rooms:
          </h2>
          <ul>
            {rooms.map((r) => (
              <li key={r} className="mb-2 flex justify-between items-center">
                <span>{r}</span>
                <button
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                  disabled={!username}
                  onClick={() => handleJoinRoom(r)}
                >
                  Join
                </button>
              </li>
            ))}
            {rooms.length === 0 && (
              <li className="text-gray-400">No rooms available yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
