// src/validations/user.validation.js

import ROLES from "../constants/roles.js";

export const validateUserCreate = (req, res, next) => {
  const { name, email, mobile, password, role } = req.body;

  if (!name || !email || !mobile || !password || role === undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      message: "Invalid role selected",
    });
  }

  next();
};
