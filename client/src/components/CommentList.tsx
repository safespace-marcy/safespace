import React, { useEffect, useState } from "react";
import { Comment, Header } from "semantic-ui-react";
/** Displays comments under a post */
const CommentList = ({ data }: any) => {
  const comments = data;
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const getNames = async () => {
      for (let i = 0; i < comments.length; i++) {
        const response = await fetch(`/user/${comments[i].user_id}`);
        const users = await response.json();
        comments[i].username = users.username;
        comments[i].sprite = users.sprite;
        comments[i].seed = users.seed;
      }
      setComplete(true);
    };
    getNames();
  });
  console.log(comments);
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {complete &&
        comments.map(
          (comment: {
            sprite: string;
            seed: string;
            created_at: string;
            username: string;
            content: string;
          }) => {
            return (
              <Comment>
                <Comment.Avatar
                  src={`https://avatars.dicebear.com/api/${comment.sprite}/${comment.seed}.svg`}
                />
                <Comment.Content>
                  <Comment.Author as="a">{comment.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.created_at}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.content}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          }
        )}
    </Comment.Group>
  );
};
export default CommentList;
