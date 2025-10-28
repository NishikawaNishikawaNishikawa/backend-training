import { FC, FormEvent, useState } from "react";

interface PostUpdateProps {
  onClose: () => void;
  onSubmit: (impPost: { title: string; content: string }) => Promise<void>;
  initial: {
    title: string;
    content: string;
  };
}

const PostUpdateModal: FC<PostUpdateProps> = ({
  onClose,
  onSubmit,
  initial,
}) => {
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      console.error("All fields are required");
      return;
    }
    onSubmit({ title, content });
  };

  return (
    <>
      <div style={modalBackdropStyle} onClick={onClose}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </label>
            <button type="submit">Update Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

// --- スタイル定義 ---

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // 半透明の背景
  display: "flex",
  justifyContent: "center", // コンテンツを水平中央に
  alignItems: "center", // コンテンツを垂直中央に
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  // ✅ ここがモーダル本体のスタイル
  backgroundColor: "white", // 背景色
  padding: "40px", // 内側の余白
  borderRadius: "12px", // 角を丸くする
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // 浮いているように見せる影
  minWidth: "450px", // 最小の幅
  maxWidth: "90%", // 画面幅に収まるように

  // フォーム内の要素を縦に並べるためのFlex設定もよく使われます
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default PostUpdateModal;
