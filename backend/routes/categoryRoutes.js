import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} from "../controllers/categoryControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, createCategory);
router.route("/getAll").get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(authenticate, deleteCategoryById)
  .put(authenticate, updateCategoryById);

export default router;
