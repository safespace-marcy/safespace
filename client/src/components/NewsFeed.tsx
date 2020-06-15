import React, { useState, useEffect } from "react";
import Post from "./NewPost";
import NewPostModal from "./NewPostModal";
import { useParams } from "react-router-dom";
import { Loader, Item } from "semantic-ui-react";

function NewsFeed() {
  const [response, setResponse] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const req = await fetch(`/posts-community/${id}`);
      const response = await req.json();
      setResponse(response);
    };
    getPost();
  }, [id]);

  return response === null ? (
    <div>
      <Loader
        style={{ display: "flex", alignItems: "center" }}
        indeterminate
        active
      >
        Loading Feed...
      </Loader>
    </div>
  ) : (
    <>
      <NewPostModal setNewPost={setNewPost} />
      <Item.Group>
        {response.map((res: any, i: number) => (
          <Post key={res.title + i} data={res} />
        ))}
      </Item.Group>
    </>
  );
}

export default NewsFeed;
