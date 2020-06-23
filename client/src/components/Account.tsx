import React, { useState, useContext, useEffect } from "react";
import Post from "./NewPost";
import { UserContext } from "../contexts/userContext";
import { Item, Card, Loader } from "semantic-ui-react";
import { Jumbotron, Button } from "react-bootstrap";

/**
 * Account Page: Shows all posts for logged in user
 */

function Account() {
  const [posts, setPosts] = useState([]);
  const { user }: any = useContext(UserContext);
  const [userResponse, setUserResponse] = useState({});

  const getUser = async () => {
    const req = await fetch(`/user/${user.id}`);
    const res = await req.json();
    setUserResponse(res);
  };

  useEffect(() => {
    getUser();
  }, [userResponse]);

  useEffect(() => {
    const getPost = async () => {
      const req = await fetch(`/posts-user/${user.id}`);
      const res = await req.json();
      return setPosts(res);
    };
    getPost();
  }, [user]);

  return (
    <>
      {user ? (
        <div>
          <Jumbotron>
            <h1>{user.username}</h1>
          </Jumbotron>
          <div style={{ width: "65%", margin: "0 auto" }}>
            <Card.Group>
              {posts.map((res: any, i) => (
                <Post key={res.title + i} data={res} />
              ))}
            </Card.Group>
          </div>
        </div>
      ) : (
        <div>
          <Loader
            style={{ display: "flex", alignItems: "center" }}
            indeterminate
            active
          >
            Loading Feed...
          </Loader>
        </div>
      )}
    </>
  );
}

export default Account;
