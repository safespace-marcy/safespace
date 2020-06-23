import React, { useState, useContext, useEffect } from "react";
import Post from "./NewPost";
import { useParams } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { Jumbotron } from "react-bootstrap";

function OtherUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ username: "" });
  const [posts, setPosts] = useState([]);

  const getUser = async () => {
    const req = await fetch(`/user/${id}`);
    const data = await req.json();
    setUser(data);
  };

  const getPosts = async () => {
    const req = await fetch(`/posts-user/${id}`);
    const data = await req.json();
    setPosts(data);
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1>{user.username}</h1>
      </Jumbotron>
      <div style={{ width: "65%", margin: "0 auto" }}>
        <Item.Group>
          {posts.map((res, i) => (
            <Post key={i} data={res} />
          ))}
        </Item.Group>
      </div>
    </div>
  );
}

export default OtherUser;
