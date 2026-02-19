import User from "../modules/user/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password ,role } = req.body;

    // 1️⃣ Required field validation
    if (!email || !password || role === undefined) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    // 2️⃣ Find user by email + role
    const user = await User.findOne({
      email,
      role: Number(role),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 2️⃣ Password verify
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3️⃣ JWT generate
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
