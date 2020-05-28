import React from "react";
import { Comment, Header } from "semantic-ui-react";

/** Displays comments under a post */
const CommentList = ({ data }) => {
  const comments = data;
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {comments.map((res) => {
        return (
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Comment.Content>
              <Comment.Author as="a">{res.user_id}</Comment.Author>
              <Comment.Metadata>
                <div>{res.created_at}</div>
              </Comment.Metadata>
              <Comment.Text>{res.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        );
      })}
    </Comment.Group>
  );
};
export default CommentList;
