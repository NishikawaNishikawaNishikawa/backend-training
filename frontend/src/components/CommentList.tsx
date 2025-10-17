import { FC } from "react";

type User = {
  id: number;
  name: string;
};

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
};

const CommentList: FC<{
  users: User[];
  postId: number;
  comments: Comment[];
}> = ({ users, postId, comments }) => {
  const filteredComments = comments.filter(
    (comment) => Number(comment.post_id) === Number(postId)
  );

  return (
    <div>
      <ul>
        {filteredComments.map((comment) => (
          <li key={comment.id}>
            <strong>
              {users.find((u) => u.id === comment.user_id)?.name ||
                `UserId ${comment.user_id}`}
            </strong>
            - {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
