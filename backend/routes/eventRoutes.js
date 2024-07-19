import express from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getAllParticipants,
  getEventById,
  updateEventById,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticate, createEvent);
router.get("/getAll/participants", getAllParticipants);
router.get("/getAll", getAllEvents);
router
  .route("/:id")
  .get(getEventById)
  .delete(authenticate, deleteEventById)
  .put(authenticate, updateEventById);

export default router;
