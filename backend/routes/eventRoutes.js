import express from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, createEvent);
router.route("/getAll").get(getAllEvents);
router
  .route("/:id")
  .get(getEventById)
  .delete(authenticate, deleteEventById)
  .put(authenticate, updateEventById);

export default router;
