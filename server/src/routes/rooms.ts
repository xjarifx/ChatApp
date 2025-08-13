import { Router } from "express";
import { roomMessages } from "../store/roomMessages";

const router = Router();

router.get("/rooms", (req, res) => {
  res.json({ rooms: Object.keys(roomMessages) });
});

router.get("/rooms/:room/messages", (req, res) => {
  const room = req.params.room;
  if (typeof room !== "string" || !/^[\w-]+$/.test(room)) {
    return res.status(400).json({ error: "Invalid room parameter" });
  }
  res.json(roomMessages[room] || []);
});

export default router;
