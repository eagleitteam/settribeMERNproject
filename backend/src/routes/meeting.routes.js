import express from "express";
import {
  createMeeting,
  getAllMeetings,
  updateMeeting,
  deleteMeeting,
} from "../controller/meeting.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // JWT required

router.post("/", createMeeting);
router.get("/", getAllMeetings);
router.put("/:id", updateMeeting);
router.delete("/:id", deleteMeeting);

export default router;