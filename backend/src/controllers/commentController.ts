import { Request, Response } from "express";
import { getAllComments, getCommentById } from "../models/comment";
import { db } from "../db";
import { ResultSetHeader } from "mysql2";

export const getComments = async (req: Request, res: Response) => {
  const posts = await getAllComments();
  res.json(posts);
};

export const getComment = async (req: Request, res: Response) => {
  const post = await getCommentById(Number(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(post);
};

export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, content, createdAt } = req.body;

  // 入力のバリデーション
  if (!postId || !userId || !content || !createdAt) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO comments (post_id, user_id, content, created_At) VALUES (?, ?, ?, ?)",
      [postId, userId, content, createdAt]
    );
    res
      .status(201)
      .json({ id: result.insertId, postId, userId, content, createdAt });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};
