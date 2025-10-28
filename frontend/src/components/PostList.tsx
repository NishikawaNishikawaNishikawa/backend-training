import { FC } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useComments } from "../hooks/useComments";
import { useState } from "react";
import PostUpdateModal from "./PostUpdateModal";

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
};

type UpdatePost = (inpPost: {
  id: number;
  title: string;
  content: string;
}) => Promise<void>;

const PostList: FC<{
  users: User[];
  posts: Post[];
  updatePost: UpdatePost;
}> = ({ users, posts, updatePost }) => {
  const { comments, addComment } = useComments();

  //コメント編集フォームの表示有無を設定
  const [postId, setpostId] = useState<number | null>(null);
  const openModal = (postId: number) => setpostId(postId);
  const closeModal = () => setpostId(null);

  //フォームからの編集内容で実際の投稿に編集を行う
  const handleUpdate = (
    postId: number,
    inpPost: { title: string; content: string }
  ) => {
    const postDataWithId = {
      id: postId,
      title: inpPost.title,
      content: inpPost.content,
    };

    return updatePost(postDataWithId).finally(() => {
      closeModal();
    });
  };

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span style={{ marginRight: "15px" }}>
              <strong>{post.title}</strong> - {post.content}
            </span>
            <button onClick={() => openModal(post.id)}>post update</button>
            {postId === post.id && (
              <PostUpdateModal
                onClose={closeModal}
                onSubmit={(inpPost) => handleUpdate(post.id, inpPost)}
                initial={{ title: post.title, content: post.content }}
              />
            )}
            <CommentList users={users} postId={post.id} comments={comments} />
            <CommentForm
              inpPostId={post.id}
              users={users}
              onCommentAdded={addComment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
