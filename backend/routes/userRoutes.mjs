import express from "express";

// Controllers
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.mjs";

// middleware
import { protect, admin } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", protect, logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
