import React, { useState, createRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'semantic-ui-react'
import { colorPallet } from './Theme'
import WritePostForm from './WritePostForm'
import { Navbar } from 'react-bootstrap'

function NewPostModal (props) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const contextRef = createRef()
  return (
    // <>
    <div>
      <Navbar fixed="bottom">
      <Button size='medium' style={{ color: colorPallet.marvel }} circular icon='add' onClick={handleShow}/>
    
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>New Post</Modal.Header>
        <Modal.Body>
          <WritePostForm setShow={setShow} setNewPost={props.setNewPost} id={props.id} />
        </Modal.Body>
      </Modal>
      </Navbar>
      </div>
    
     
    
     //</>
  )
}

export default NewPostModal
