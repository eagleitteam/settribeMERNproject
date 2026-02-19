import mongoose from "mongoose";
import ROLES from "../../constants/roles.js"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: Number,
    enum: Object.values(ROLES),
    required: true,
  },

  status: {
    type: String,
    required: true,
  }
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
