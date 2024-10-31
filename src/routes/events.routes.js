import { Router } from "express";
import {
  createDoc,
  getUserDocs,
  deleteDoc,
  updateDocSetting,
} from "../controllers/docs.controller.js";
import { authenticateUser } from "../middlewares/authenciateUser.js";

const router = Router();

//gets logged in users task
router.route("/").get(authenticateUser, (req, res) => res.json(req.user));

//create logged in users Events
router.route("/").post(authenticateUser, createDoc);

//Delete's logged in users Events
router.route("/:eventId").delete(authenticateUser, deleteDoc);

//Update's logged in user's Events
router.route("/").patch(authenticateUser, updateDocSetting);

export default router;
