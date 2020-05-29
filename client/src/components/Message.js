import React from "react";
import { Comment } from "semantic-ui-react";

const Message = (props) => {
  return (
    <Comment>
      <Comment.Avatar
        as="a"
        src={`https://avatars.dicebear.com/api/${props.sprite}/${props.seed}.svg`}
      />
      <Comment.Content>
        <Comment.Author>{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{props.sentAt}</div>
          {props.isPrivate && (
            <div
              style={{ color: "red" }}
            >{`${props.author} private messaged you`}</div>
          )}
        </Comment.Metadata>
        <Comment.Text>
          <p>{props.message}</p>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
