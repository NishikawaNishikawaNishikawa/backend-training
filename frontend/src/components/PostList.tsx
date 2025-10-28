import { FC } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useComments } from "../hooks/useComments";

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

const PostList: FC<{ users: User[]; posts: Post[] }> = ({ users, posts }) => {
  const { comments, addComment } = useComments();

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.content}
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
