import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.route("/create").post(createCategory);
router.route("/getAll").get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(deleteCategoryById)
  .put(updateCategoryById);

export default router;
