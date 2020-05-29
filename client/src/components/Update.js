import React, { useState, createRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown } from "semantic-ui-react";
import { colorPallet } from "./Theme";
import WritePostForm from "./WritePostForm";
import { Navbar } from "react-bootstrap";

function Update(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const contextRef = createRef();

  return (
    <div>
      <Dropdown.Item text="Edit" onClick={handleShow} />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>New Post</Modal.Header>
        <Modal.Body>
          <WritePostForm
            setShow={setShow}
            setNewPost={props.setNewPost}
            postId={props.id}
            update
            title={props.title}
            body={props.body}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Update;
