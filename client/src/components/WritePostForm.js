import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Input, TextArea } from "@gympass/yoga";

function WritePostForm(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [alert, setAlert] = useState(null);
  const [update, setUpdate] = useState(false);
  const communityId = props.id;
  const postId = props.postId;
  useEffect(() => {
    const isAnUpdate = () => {
      setUpdate(props.update);

      if (update) {
        setTitle(props.title);
        setBody(props.body);
      }
    };

    isAnUpdate();
  }, [update]);

  function handleTitleChange(e) {
    const currentTitle = e.target.value;
    // as long as 2 commit messages
    if (title.length === 72 * 2) return;
    setTitle(currentTitle);
  }

  function handleBodyChange(e) {
    const currentBody = e.target.value;
    setBody(currentBody);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newPostInit;
    if (update) {
      newPostInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, postId }),
      };
    } else {
      newPostInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, communityId }),
      };
    }

    const res = await fetch("/posts", newPostInit);
    if (res.status === 401) {
      return warn("Connection Error. Please try again later!");
    }
    if (res.status === 500) {
      return warn(
        "Our computers are feeling down, please try again in a few moments."
      );
    }
    if (res.status === 201) {
      props.setShow(false);
    }
  }

  function warn(warningText) {
    setAlert(warningText);
    window.setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return (
    <>
      <h3>Submit a post</h3>
      {alert && <Alert variant="warning">{alert}</Alert>}
      <Form>
        <Input
          label="Title"
          helper="Give your post a title"
          maxLength={72 * 2}
          value={title}
          onChange={handleTitleChange}
          onClean={() => setTitle("")}
        />
        <br />
        <TextArea
          label="Post Body"
          helper="Share your thoughts! Remember to be considerate of yourself and others"
          value={body}
          onChange={handleBodyChange}
        />
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  );
}

export default WritePostForm;
