import express from "express";
import {
  createTechnicalCategory,
  updateTechnicalCategoryById,
} from "../controllers/technicalControllers.js";

const router = express.Router();

router.post("/", createTechnicalCategory);
// router.put("/:id", updateTechnicalCategoryById);

export default router;
