import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";

function Edit() {
  const [response, setResponse] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const req = await fetch(`/posts/${id}`);
      const data = await req.json();
      return setResponse(data);
    };
    getPost();
  }, [id]);

  const deletePost = () => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // const switchToForm(){
  //   return (

  //     )
  // }

  // const editPost = () => {
  //   fetch(`/posts/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     // body: JSON.stringify({
  //     //   avatar: [sprite, seed],
  //     //   username: username,
  //     //   email: email,
  //     //   password: password
  //     // })
  //   })
  // }

  return (
    <Item
      style={{
        width: "80%",
        marginLeft: "10%",
        marginTop: "30px",
        border: "2px solid black",
        padding: "15px",
        boxShadow: "2px 5px #888888",
      }}
    >
      <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      <Item.Content>
        <Item.Header as="a">Title will go here</Item.Header>
        <Item.Description>Description</Item.Description>
        <Item.Extra>
          <button type="button" class="btn btn-primary" onClick={deletePost}>
            Delete
          </button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default Edit;
