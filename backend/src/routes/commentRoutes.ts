import { Router } from "express";
import {
  getComments,
  getComment,
  createComment,
} from "../controllers/commentController";

const router = Router();

router.get("/", getComments);
router.get("/:id", getComment);

router.post("/", createComment);

export default router;
