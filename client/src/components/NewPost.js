import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Comment,
  Header,
  Form,
  Item,
  Dropdown,
  Icon,
  Label
} from "semantic-ui-react";
import ReadMoreReact from "read-more-react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import CommentList from "./CommentList";
import Update from "./Update";

const Post = ({ data }) => {
  // data: community_id, content, created_at, id, likes, title, user_id
  const location = useLocation();
  const { title } = data;
  const dateCreated = new Date(data.created_at);
  const postId = data.id;
  const postAuthorId = data.user_id;
  const communityId = data.community_id;

  const { user } = useContext(UserContext);
  const [newPost, setNewPost] = useState(false);
  const [likes, setLikes] = useState([]); // number of likes
  const [comments, setComments] = useState(null);
  const [isCommentsShowing, setIsCommentsShowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // current user clicked 'like'
  const [isChanged, setIsChanged] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      const req = await fetch(`/likes/${postId}`);
      const postLikes = await req.json();
      setLikes(postLikes);
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].user_id === postAuthorId) return setIsLiked(true);
      }
    };
    getLikes();
  }, [isLiked]);

  const [author, setAuthor] = useState(null); // all author's info

  useEffect(() => {
    const getAuthor = async () => {
      const req = await fetch(`/user/${postAuthorId}`);
      const newAuthor = await req.json();
      setAuthor(newAuthor);
    };
    getAuthor();
  }, []);

  const getComments = async () => {
    if (isCommentsShowing) {
      setIsCommentsShowing(false);
    } else {
      const req = await fetch(`/comments/${postId}`);
      const comments = await req.json();
      setComments(comments);
      setIsCommentsShowing(true);
    }
  };

  const likePost = async () => {
    const likeInit = {
      method: "POST",
    };

    if (isLiked) {
      const req = await fetch(`/unlike/${postId}/${postAuthorId}`, likeInit);
      const newLikes = await req.json();
      setLikes(newLikes);
      setIsLiked(false);
    } else {
      const req = await fetch(`/like/${postId}/${postAuthorId}`, likeInit);
      const newLikes = await req.json();
      setLikes(newLikes);
      setIsLiked(true);
    }
  };

  const showComments = () => {
    if (isCommentsShowing) {
      setIsCommentsShowing(false);
    } else {
      setIsCommentsShowing(true);
    }
  };

  const deletePost = async (postId) =>
    fetch(`/posts/${postId}`, { method: "DELETE" });

  const [userComment, setUserComment] = useState("");

  const createComment = async () => {
    const commentInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, content: userComment }),
    };
    await fetch("/comments", commentInit);
    setIsChanged((p) => !p);
  };

  const handleCommentChange = (e) => {
    const currentComment = e.target.value;
    setUserComment(currentComment);
  };

  const { sprite, seed, username } = author || {
    sprite: "jdenticon",
    seed: "2f",
    username: "User",
  };
  const avatar = `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`;

  const [userResponse, setUserResponse] = useState(null);

  const getUser = async () => {
    const req = await fetch(`/user/${data.user_id}`);
    const userResponse = await req.json();
    setUserResponse(userResponse);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card fluid>
      {isChanged && <Redirect to={location.pathname} />}
      <Card.Content>
        {data.user_id === user?.id && (
          <Button floated="right">
            <Dropdown floated="right" icon="edit">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Delete"
                  onClick={() => deletePost(data.id)}
                />
                <Dropdown.Item text="Edit">
                  <Update
                    setNewPost={setNewPost}
                    id={data.id}
                    title={data.title}
                    body={data.content}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Button>
        )}
        <Image floated="right" size="mini" src={avatar} />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {userResponse ? (
            <LinkContainer to={`/user/${userResponse.id}`}>
              <Nav.Link>By {userResponse.username}</Nav.Link>
            </LinkContainer>
          ) : (
            ""
          )}
        </Card.Meta>
        <Card.Meta>{dateCreated.toLocaleString()}</Card.Meta>
        <Card.Description>
          <ReadMoreReact
            text={data.content}
            min={200}
            max={500}
            ideal={350}
            readMoreText="Read More"
          />
        </Card.Description>
      </Card.Content>

      <Card.Content
        extra
        style={{ display: "flex", justifyContents: "space-between" }}
      >
        <Card.Description style={{ marginRight: "4px" }}>
           <Button as='div' labelPosition='left'>
              <Label as='a' basic pointing='right'>
                {likes.length}
              </Label>
              <Button style={isLiked ? {color:"#1FB6FF"} : {color:"white"}} onClick={() => likePost()} color="black" icon>
                <Icon name='heart' />
                {isLiked ? "Liked" : "Like"}
              </Button>
            </Button>

        </Card.Description>
        <Card.Description>

        </Card.Description>
        <Card.Description onClick={() => getComments()}>
          <Button color="black" animated>
            <Button.Content style={{color:'white'}} visible>Comments</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Comment.Group>
          {isCommentsShowing && <CommentList data={comments} />}
          <Form reply>
            <Form.TextArea width={12} onChange={handleCommentChange} />
            <Button
              onClick={() => createComment()}
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              secondary
            />
          </Form>
        </Comment.Group>
      </Card.Content>
    </Card>
  );
};

export default Post;
