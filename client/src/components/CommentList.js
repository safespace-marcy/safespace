import React, {useEffect, useState} from "react";
import { Comment, Header } from "semantic-ui-react";
/** Displays comments under a post */
const CommentList = ({ data }) => {
  const comments = data;
  console.log(comments)
  const [complete, setComplete] = useState()
useEffect(()=>{
  const getNames = async() =>{
  for(let i = 0; i < comments.length; i++){
    const response = await fetch(`/user/${comments[i].user_id}`)
    const users = await response.json()
    comments[i].username = users.username
    comments[i].sprite = users.sprite
    comments[i].seed = users.seed
  }
  setComplete(true)
}
getNames()
})
console.log(comments)
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {complete && comments.map((res)=> {
        console.log(res)
        return (
          <Comment>
            <Comment.Avatar src={`https://avatars.dicebear.com/api/${res.sprite}/${res.seed}.svg`} />
            <Comment.Content>
              <Comment.Author as="a">{res.username}</Comment.Author>
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
