import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
  getAll,
} from "../controllers/categoryControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:eventId/create").post(authenticate, createCategory);
router.route("/:eventId/getAll").get(getAllCategories);
router
  .route("/:eventId/:categoryId")
  .get(getCategoryById)
  .delete(authenticate, deleteCategoryById)
  .put(authenticate, updateCategoryById);
router.route("/").get(getAll);

export default router;
