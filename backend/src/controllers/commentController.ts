import { Request, Response } from "express";
import { getAllComments, getCommentById } from "../models/comment";
import { db } from "../db";
import { ResultSetHeader } from "mysql2";

export const getComments = async (req: Request, res: Response) => {
  const comments = await getAllComments();
  res.json(comments);
};

export const getComment = async (req: Request, res: Response) => {
  const comment = await getCommentById(Number(req.params.id));
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(comment);
};

export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;

  // 入力のバリデーション
  if (!postId || !userId || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [postId, userId, content]
    );
    res.status(201).json({ id: result.insertId, postId, userId, content });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};
