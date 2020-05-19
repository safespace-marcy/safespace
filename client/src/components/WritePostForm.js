import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { Input, TextArea, Button } from '@gympass/yoga'

function WritePostForm (props) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [alert, setAlert] = useState(null)

  function handleTitleChange (e) {
    const currentTitle = e.target.value
    // as long as 2 commit messages
    if (title.length === 72 * 2) return
    setTitle(currentTitle)
  }

  function handleBodyChange (e) {
    const currentBody = e.target.value
    setBody(currentBody)
  }

  async function handleSubmit (e) {
    console.log('called')
    e.preventDefault()
    const newPostInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body }) // TODO: add communityId from props
    }
    const res = await fetch('/posts', newPostInit)
    if (res.status === 401) {
      return warn('Connection Error. Please try again later!')
    }
    if (res.status === 500) {
      return warn(
        'Our computers are feeling down, please try again in a few moments.'
      )
    }
    if (res.status === 201) {
      props.setNewPost(prev => !prev)
      props.setShow(false)
    }
  }

  function warn (warningText) {
    setAlert(warningText)
    window.setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  return (
    <>
      <h3>Submit a post</h3>
      {alert && <Alert variant='warning'>{alert}</Alert>}
      <Form>
        <Input
          label='Title'
          helper='Give your post a title'
          maxLength={72 * 2}
          value={title}
          onChange={handleTitleChange}
          onClean={() => setTitle('')}
        />
        <br />
        <TextArea
          label='Post Body'
          helper='Share your thoughts! Remember to be considerate of yourself and others'
          value={body}
          onChange={handleBodyChange}
        />
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </>
  )
}

export default WritePostForm
