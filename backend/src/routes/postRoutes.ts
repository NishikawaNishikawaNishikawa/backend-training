import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
} from "../controllers/postController";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", createPost);
router.put("/:id", updatePost);

export default router;
