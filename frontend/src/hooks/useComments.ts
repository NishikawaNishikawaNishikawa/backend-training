import { useState, useEffect } from "react";
import { getComments, addComment } from "../services/api";

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
};

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch Comments:", error);
    }
  };

  const handleAddComment = async (comment: {
    postId: number;
    userId: number;
    content: string;
  }) => {
    if (!comment.userId || !comment.content) {
      console.error("All fields are required.");
      return;
    }

    try {
      await addComment(comment);
      // 投稿後に再取得
      await fetchComments();
    } catch (error) {
      console.error("Failed to add Post:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, addComment: handleAddComment, fetchComments };
};
