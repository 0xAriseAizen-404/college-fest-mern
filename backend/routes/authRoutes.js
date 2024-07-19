import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createAdmin,
  deleteAdminById,
  getAllAdmins,
  loginAdmin,
  getCurrAdmin,
  logOutAdmin,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(logOutAdmin);
router.route("/create").post(authenticate, createAdmin);
router.route("/").get(authenticate, getAllAdmins);
router
  .route("/:id")
  .delete(authenticate, deleteAdminById)
  .get(authenticate, getCurrAdmin);

export default router;
