import express from "express";
import checkPermission from "../middleware/checkPermission.middleware.js";
import PERMISSIONS from "../constants/permissions.js";
import MODULES from "../modules/role/modules.js";
import {
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import { validateUserCreate } from "../validations/user.validation.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ----------------------------------
   CREATE USER (Protected)
----------------------------------- */
router.post(
  "/",
  authMiddleware,
  checkPermission(MODULES.USERS, PERMISSIONS.CREATE),
  validateUserCreate,
  registerUser
);

/* ----------------------------------
   REGISTER USER (Optional: Public)
   जर public registration असेल तर auth काढ
----------------------------------- */
router.post(
  "/register",
  validateUserCreate,
  registerUser
);

/* ----------------------------------
   GET ALL USERS (READ)
----------------------------------- */
router.get(
  "/",
  authMiddleware,
  checkPermission(MODULES.USERS, PERMISSIONS.READ),
  getAllUsers
);

/* ----------------------------------
   PROFILE (Authenticated Only)
----------------------------------- */
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Profile accessed",
      user: req.user,
    });
  }
);

/* ----------------------------------
   UPDATE USER
----------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  checkPermission(MODULES.USERS, PERMISSIONS.UPDATE),
  updateUser
);

/* ----------------------------------
   DELETE USER
----------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  checkPermission(MODULES.USERS, PERMISSIONS.DELETE),
  deleteUser
);

export default router;