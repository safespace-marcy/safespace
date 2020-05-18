import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function registerUser () {
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
  }

  function redirectToLogin(){
    if(isSubmitted){
      return <Redirect to='/login'/>
    }
  }

  function submitForm (e) {
    e.preventDefault()

    async function registerUser () {
      fetch('/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
        })

    }

    registerUser()
    setIsSubmitted(true)
  }

  return (
    <Container className='justify-content-md-center' fluid='lg'>
      <form onSubmit={submitForm} className='registerForm'>
        <div class='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            className='form-control'
            value={username}
            onChange={e => setUsername(e.target.value)}
            id='username'
          />
          <small id="emailHelp" class="form-text text-muted">Must be longer than 6 characters</small>
        </div>

        <div class='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='text' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} id='email' />
        </div>

        <div class='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={e => setPassword(e.target.value)}
            id='password'
          />
          <small id="emailHelp" class="form-text text-muted">Must be longer than 8 characters</small>
        </div>

        <button type='submit' class='btn btn-primary'>Sign-up</button>
      </form>
      {isSubmitted ? redirectToLogin() : ''}
    </Container>
  )
}

export default Register
