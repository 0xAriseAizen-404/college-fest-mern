import express from "express";
import {
  createNonTechnicalCategory,
  updateNonTechnicalCategoryById,
} from "../controllers/nonTechnicalControllers.js";

const router = express.Router();

router.post("/", createNonTechnicalCategory);
// router.put("/:id", updateNonTechnicalCategoryById);

export default router;
