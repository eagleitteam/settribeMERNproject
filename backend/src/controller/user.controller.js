// src/controllers/user.controller.js
import User from "../modules/user/user.model.js";
import ROLES from "../constants/roles.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role ,status} = req.body;

    // 1️⃣ Required fields check
    if (!name || !email || !mobile || !password || !status || role === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Role validation
    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected",
      });
    }

    // 3️⃣ Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 4️⃣ Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      status,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL USERS (TABLE API)
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
};
