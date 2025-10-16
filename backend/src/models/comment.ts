import { db } from "../db";
import { RowDataPacket, OkPacket, PoolConnection } from "mysql2/promise";

// commentの型定義
type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
};

// 全投稿を取得する関数
export const getAllComments = async (): Promise<Comment[]> => {
  const [rows] = await db.query<Comment[] & RowDataPacket[]>(
    "SELECT * FROM comments"
  );
  return rows;
};

// 特定の投稿を取得する関数
export const getCommentById = async (id: number): Promise<Comment | null> => {
  const [rows] = await db.query<Comment[] & RowDataPacket[]>(
    "SELECT * FROM comments WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};
