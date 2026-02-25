import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
    },

    date: {
      type: String,
      required: [true, "Meeting date is required"],
    },

    time: {
      type: String,
      required: [true, "Meeting time is required"],
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },

    mode: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },

    location: {
      type: String,
      required: [true, "Meeting link/location is required"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
    },

    agenda: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);