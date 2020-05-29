import React, { useState, useEffect } from "react";
import NewPostModal from "./NewPostModal";
import { Jumbotron, Tabs, Tab } from "react-bootstrap";
import Post from "./NewPost";
import { useParams } from "react-router-dom";
import { Item, Card, Message, Feed } from "semantic-ui-react";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState({});
  const [moderators, setModerators] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const { type, id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      if (type === "member") {
        const req = await fetch(`/posts-community/${id}`);
        const response = await req.json();
        console.log(response, "member");
        setPosts(response);
      } else {
        const req = await fetch(`/posts-community/visiter/${id}`);
        const response = await req.json();
        console.log(response, "visiter");
        setPosts(response);
      }
    };

    const getModerators = async () => {
      const req = await fetch(`/moderators/${id}`);
      const res = await req.json();
      // console.log(res.map(obj => obj.username))
      setModerators(res);
    };

    const getCommunity = async () => {
      const req = await fetch(`/communities/${id}`);
      const res = await req.json();
      setCommunity(res);
    };

    getModerators();
    getCommunity();
    getPosts();
  }, [id]);

  return (
    <div>
      <Jumbotron>
        <h1>{community.display_name}</h1>
        <p>{community.headline}</p>
      </Jumbotron>
      <Tabs
        defaultActiveKey="newsfeed"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="newsfeed" title="Newsfeed">
          <br />
          <div style={{ width: "65%", margin: "0 auto" }}>
            <Card.Group>
              <NewPostModal setNewPost={setNewPost} id={id} />
              {Array.isArray(posts) &&
                posts.map((res, i) => <Post key={i} data={res} />)}
            </Card.Group>
          </div>
        </Tab>
        <Tab eventKey="about" title="About">
          <Message style={{marginTop:"20px"}}>
            <Message.Header>About Us</Message.Header>
            <p>{community.description}</p>
          </Message>
        </Tab>
        <Tab eventKey="admins" title="Admins">
            <Message style={{marginTop:"20px"}}>
              <Message.Header>Adminstrators of this group:</Message.Header>
                <Message.List>
                  {moderators.map((moderator, i) => (
                    <Message.Item key={i}>
                      <Feed.Event>
                        <Feed.Label style={{width:"50px"}} image={`https://avatars.dicebear.com/api/${moderator.sprite}/${moderator.seed}.svg`} />
                        <Feed.Content>
                          <Feed.Summary
                            content={moderator.username}
                          />
                        </Feed.Content>
                      </Feed.Event>

                    </Message.Item>
                  ))}
                </Message.List>
            </Message>

        </Tab>
      </Tabs>
    </div>
  );
};

export default Community;
