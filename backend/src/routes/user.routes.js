import express from "express";
import checkPermission from "../middleware/checkPermission.middleware.js";
import PERMISSIONS from "../constants/permissions.js";
import { registerUser, getAllUsers  } from "../controller/user.controller.js";
import { validateUserCreate } from "../validations/user.validation.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Create user
router.post(
  "/",
  validateUserCreate,
  registerUser
);

// Register user
router.post(
  "/register",
  validateUserCreate,
  registerUser
);


// TABLE DATA API
router.get("/", getAllUsers);

// secure login check
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user,
  });
});

router.delete(
  "/:id",
  authMiddleware,
  checkPermission(PERMISSIONS.DELETE),
  (req, res) => {
    res.json({ message: "User deleted" });
  }
);

export default router;
