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
  const { user } = useContext(UserContext);
  const [userResponse, setUserResponse] = useState(null);

  const getUser = async () => {
    const req = await fetch(`/user/${user.id}`);
    const userResponse = await req.json();
    setUserResponse(userResponse);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/posts-user/${user.id}`);
      const rawPosts = await res.json();
      return setPosts(rawPosts);
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
              {posts.map((res, i) => (
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
