import { db } from "../db";
import { RowDataPacket, OkPacket, PoolConnection } from "mysql2/promise";

// Postの型定義
type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
};

// 全投稿を取得する関数
export const getAllPosts = async (): Promise<Post[]> => {
  const [rows] = await db.query<Post[] & RowDataPacket[]>(
    "SELECT * FROM posts"
  );
  return rows;
};

// 特定の投稿を取得する関数
export const getPostById = async (id: number): Promise<Post | null> => {
  const [rows] = await db.query<Post[] & RowDataPacket[]>(
    "SELECT * FROM posts WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

// ユーザーIDに紐づく投稿を削除する関数
export const deletePostsByUserId = async (
  userId: number,
  connection: PoolConnection
): Promise<number> => {
  const [result] = await connection.query<OkPacket>(
    "DELETE FROM posts WHERE user_id = ?",
    [userId]
  );
  return result.affectedRows;
};

// 指定された投稿を更新する関数
export const updatePost = async (
  id: number,
  title: string,
  content: string
): Promise<number> => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 投稿を更新
    const [result] = await connection.query<OkPacket>(
      "UPDATE posts SET title = ?, content = ? WHERE id = ? ",
      [title, content, id]
    );

    await connection.commit();

    return result.affectedRows;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
