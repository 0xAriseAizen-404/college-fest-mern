import express from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/create").post(createEvent);
router.route("/getAll").get(getAllEvents);
router
  .route("/:id")
  .get(getEventById)
  .delete(deleteEventById)
  .put(updateEventById);

export default router;
