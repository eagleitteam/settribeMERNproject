import Meeting from "../modules/meeting/meeting.model.js";

/* =========================
   CREATE MEETING
========================= */
export const createMeeting = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      duration,
      mode,
      location,
      department,
      agenda,
    } = req.body;

    // 1️⃣ Required fields check
    if (!title || !date || !time || !duration || !location || !department) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Create meeting
    const meeting = await Meeting.create({
      title,
      date,
      time,
      duration,
      mode,
      location,
      department,
      agenda,
      createdBy: req.user.id, // JWT middleware required
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL MEETINGS
========================= */
export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch meetings",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE MEETING
========================= */
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   DELETE MEETING
========================= */
export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};