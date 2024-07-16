import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createAdmin,
  deleteAdminById,
  getAllAdmins,
  loginAdmin,
  getCurrAdmin,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/create").post(createAdmin);
router.route("/").get(authenticate, getAllAdmins);
router
  .route("/:id")
  .delete(authenticate, deleteAdminById)
  .get(authenticate, getCurrAdmin);

export default router;
