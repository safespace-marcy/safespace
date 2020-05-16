import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function WritePostForm () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [community, setCommunity] = useState('')
  const [alert, setAlert] = useState(null)

  function handleTitleChange (e) {
    const currentTitle = e.target.value
    if (title.length === 72 * 2) return
    setTitle(currentTitle)
  }

  function handleBodyChange (e) {
    const currentBody = e.target.value
    setBody(currentBody)
  }

  function handleCommunityChange (e) {
    const currentCommunity = e.target.value
    setCommunity(currentCommunity)
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const newPostInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body, community })
    }
    const res = await fetch('/posts', newPostInit)
    if (res.status === 401) { return warn('Connection Error. Please try again later!') }
    if (res.status === 500) {
      return warn(
        'Our computers are feeling down, please try again in a few moments.'
      )
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
      {alert && <Alert variant='warning'>{alert}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='titleControl'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={handleTitleChange}
            type='text'
            placeholder='Today I...'
            size='lg'
          />
        </Form.Group>

        <Form.Group controlId='bodyControl'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            value={body}
            onChange={handleBodyChange}
            as='textarea'
            placeholder='It was new, and it was...'
            rows='8'
          />
        </Form.Group>
        {/* Hard coded communities. Next version should fetch these from our database of communities. */}
        <Form.Group controlId='communityControl'>
          <Form.Label>Choose a community</Form.Label>
          <Form.Control
            as='select'
            value={community}
            onChange={handleCommunityChange}
          >
            <option value='1'>Community 1</option>
            <option value='2'>Community 2</option>
            <option value='3'>Community 3</option>
          </Form.Control>
        </Form.Group>
        <Button type='submit'>Submit post</Button>
      </Form>
    </>
  )
}

export default WritePostForm
