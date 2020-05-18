import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from '@gympass/yoga'
import WritePostForm from './WritePostForm'

function NewPostModal (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Create new post
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>New Post</Modal.Header>
        <Modal.Body>
          <WritePostForm setShow={setShow} setNewPost={props.setNewPost} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewPostModal
