import { FC, FormEvent, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface CommentFormProps {
  inpPostId: number;
  users: User[];
  onCommentAdded: (commentData: {
    postId: number;
    userId: number;
    content: string;
    createdAt: string;
  }) => Promise<void>;
}

const CommentForm: FC<CommentFormProps> = ({
  inpPostId,
  users,
  onCommentAdded,
}) => {
  const [userId, setUserId] = useState("");

  // users が更新されたときに userId を設定
  useEffect(() => {
    if (users.length > 0) {
      setUserId(users[0].id.toString());
    }
  }, [users]);

  const postId = inpPostId;
  const createdAt = new Date().toLocaleDateString();

  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userId || !content) {
      console.error("All fields are required");
      return;
    }

    onCommentAdded({ postId, userId: Number(userId), content, createdAt });
    setContent("");
  };

  return (
    <>
      {users.length > 0 ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "baseline",
          }}
        >
          {/* ユーザー名 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
            <label htmlFor="user-select">User:</label>
            <select
              id="user-select"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {/* コメント入力欄 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
            <label htmlFor="content-input">Content:</label>
            <textarea
              id="content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={2}
            ></textarea>
          </div>{" "}
          {/* 送信ボタン */}
          <button
            type="submit"
            style={{
              width: "100px",
              padding: "5px 10px",
            }}
          >
            Comment
          </button>
        </form>
      ) : (
        <p>投稿が存在しません</p>
      )}
      <br />
    </>
  );
};

export default CommentForm;
