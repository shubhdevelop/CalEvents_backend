import { Router } from "express";
import {
  getUserEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/event.controller.js";
import { authenticateUser } from "../middlewares/authenciateUser.js";

const router = Router();

// Get logged in user's events
router.route("/").get(authenticateUser, getUserEvents);

// Create logged in user's events
router.route("/").post(authenticateUser, createEvent);

// Delete logged in user's events
router.route("/:eventId").delete(authenticateUser, deleteEvent);

// Update logged in user's events
router.route("/").patch(authenticateUser, updateEvent);

export default router;
