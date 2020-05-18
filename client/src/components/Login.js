import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { Form, Button, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { setUser } = useContext(UserContext)

  const sendCredentials = async (username, password) => {
    const data = { username: username, password: password }
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 200) return res.json()
        throw Error('Invalid Username/Password')
      })
      .then(json => setUser(json))
      .catch((err) => console.log(err))
  }

  function submitForm (e) {
    e.preventDefault()
    sendCredentials(username, password)
    setIsSubmitted(true)
  }

  function redirectToFeed () {
    if (isSubmitted) {
      return <Redirect to='/news' />
    }
  }

  return (
    <Container className='justify-content-md-center' fluid='lg'>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={submitForm}
          variant='primary'
        >
          Login
        </Button>
      </Form>
      {isSubmitted ? redirectToFeed() : ''}
    </Container>
  )
}

export default Login
